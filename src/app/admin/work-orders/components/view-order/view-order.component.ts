import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WorkOrdersService } from '../../services/work-orders.service';
import { LookupsService } from 'src/app/services/lookups.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.scss']
})
export class ViewOrderComponent {
  ngOnInit() {

  }

  constructor(
    private _activateRoute: ActivatedRoute,
    private _WorkOrdersService: WorkOrdersService,
    private _LookupsService: LookupsService
  ) {
    this.orderId = this._activateRoute.snapshot.paramMap.get('id')
    this.getOrderById(this.orderId);
    this.getworkType()
    this.getBuilding()
    this.getEqipment()
    this.getSource()
    this.getReport()
    this.getDepartment()
    this.orderForm.disable()
     this.getOrderMaterial()
    this.getOrderParts()
    this.getStatus()
  }


  orderId: any;
  currentOrder: any
  workType: any
  building: any
  equipment: any
  source: any
  report: any
  department: any
  currentLang = localStorage.getItem('lang')



  hide: boolean = true;
  confirmHide: boolean = true;
  hideRequiredMarker: boolean = true;

  materialTableData: any;
  spareTableData: any;

  status: any
  statusId: any
  isHold: boolean = false

  orderForm = new FormGroup(
    {
      start_date: new FormControl(null, [Validators.required]),
      department: new FormControl(null, [Validators.required]),
      engineer: new FormControl(null,),
      technician: new FormControl(null,),
      work_type: new FormControl(null, [Validators.required]),
      building: new FormControl(null, [Validators.required]),
      floor_no: new FormControl({ value: '', disabled: true }, [Validators.required]),
      room_no: new FormControl(null, [Validators.required]),
      source: new FormControl(null, [Validators.required]),
      customer_name: new FormControl(null, [Validators.required]),
      customer_phone: new FormControl(null, [Validators.required]),
      equipment: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      priority: new FormControl({ value: '', disabled: true }, [Validators.required]),
      type: new FormControl({ value: '', disabled: true },),
      // {value: '', disabled: true}
    }
  );

  updateOrderForm = new FormGroup({
    status: new FormControl({ value: '', disabled: true }, [Validators.required]),
    technician_report: new FormControl({ value: '', disabled: true }, [Validators.required]),
    // holding_reason: new FormControl(null),

    // used_items_descriptions: new FormControl(null,[Validators.required]),
  })


  getOrderById(id: number) {
    this._WorkOrdersService.getOrder(id).subscribe(
      (res) => {
        this.currentOrder = res.data
        // console.log(this.currentOrder.work_type.id)
        if (this.currentOrder.status.id == 4) {
          this.isHold = true;
          (this.updateOrderForm as FormGroup).addControl('holding_reason', new FormControl({ value: '', disabled: true }))
          this.updateOrderForm.patchValue({ holding_reason: this.currentOrder.holding_reason } as any);

        }
        this.orderForm.patchValue({
          department: this.currentOrder?.department.id,
          floor_no: this.currentOrder?.floor_no,
          room_no: this.currentOrder?.room_no,
          work_type: this.currentOrder?.work_type.id,
          building: this.currentOrder?.building.id,
          engineer: this.currentOrder?.engineer?.name,
          technician: this.currentOrder?.technician?.name,
          customer_name: this.currentOrder?.customer_name,
          customer_phone: this.currentOrder?.customer_phone,
          equipment: this.currentOrder?.equipment.id,
          source: this.currentOrder?.source.id,
          description: this.currentOrder?.description,
          start_date: this.currentOrder?.start_date,


        })
        this.updateOrderForm.patchValue({
          status: this.currentOrder?.status.name,
          technician_report: this.currentOrder?.technician_report,

          // holding_reason: this.currentOrder?.holding_reason,
        })
      }
    )
  }

  getOrderMaterial() {
    this._WorkOrdersService.getMaterialByOrderId(this.orderId).subscribe(
      (res) => {
        this.materialTableData = res.data
      }
    )
  }
  getOrderParts() {
    this._WorkOrdersService.getPartsByOrderId(this.orderId).subscribe(
      (res) => {
        this.spareTableData = res.data
      }
    )
  }

  // Start Lookups 

  getworkType() {
    this._LookupsService.getWork_type().subscribe(
      (res) => {
        this.workType = res.data
      }
    )
  }
  getBuilding() {
    this._LookupsService.getbuilding().subscribe(
      (res) => {
        this.building = res.data
      }
    )
  }
  getSource() {
    this._LookupsService.getSource().subscribe(
      (res) => {
        this.source = res.data
      }
    )
  }
  getEqipment() {
    this._LookupsService.getEquipment().subscribe(
      (res) => {
        this.equipment = res.data
      }
    )
  }
  getReport() {
    this._LookupsService.getReport().subscribe(
      (res) => {
        this.report = res.data
      }
    )
  }
  getDepartment() {
    this._LookupsService.getDepartment().subscribe(
      (res) => {
        this.department = res.data
      }
    )
  }
  getStatus() {
    this._LookupsService.getStatus().subscribe(
      (res) => {
        this.status = res.data
      }
    )
  }
}
