import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HelperService } from 'src/app/services/helper.service';
import { LookupsService } from 'src/app/services/lookups.service';
import { WorkOrdersService } from '../../services/work-orders.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.scss']
})
export class EditOrderComponent {
  ngOnInit() {
    this.getOrderById(this.orderId)
    this.getworkType()
    this.getBuilding()
    this.getEqipment()
    this.getSource()
    this.getReport()
    this.getDepartment()

    this.getOrderMaterial()
    this.getOrderParts()
    this.getStatus()
  }
  constructor(
    private _activateRoute: ActivatedRoute,
    private _WorkOrdersService: WorkOrdersService,
    private _LookupsService: LookupsService,
    private _ToastrService: ToastrService,
    private _Router: Router,
    private _HelperService: HelperService
  ) {
    this.orderId = this._activateRoute.snapshot.paramMap.get('id')

  }

  data: any

  orderId: any;
  currentOrder: any
  workType: any
  building: any
  equipment: any
  source: any
  report: any
  departments: any
  departmentId: any
  engineers: any
  technicians: any
  start_date: any
  date: any

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
      start_date: new FormControl(null),
      start_time: new FormControl(new Date().toTimeString().split(' ')[0], [Validators.required]),
      department_id: new FormControl(null, [Validators.required]),
      engineer_id: new FormControl(null, [Validators.required]),
      technician_id: new FormControl(null, [Validators.required]),
      work_type_id: new FormControl(null, [Validators.required]),
      building_id: new FormControl(null, [Validators.required]),
      floor_no: new FormControl(null, [Validators.required]),
      room_no: new FormControl(null, [Validators.required]),
      source_id: new FormControl(null, [Validators.required]),
      customer_name: new FormControl(null, [Validators.required]),
      customer_phone: new FormControl(null, [Validators.required]),
      equipment_id: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      priority: new FormControl("high", [Validators.required]),
      type: new FormControl("maintenance", [Validators.required]),
      status: new FormControl(null, [Validators.required]),
      technician_report: new FormControl(null, [Validators.required]),
    }

  );
  //  updateOrderForm = new FormGroup({
  //   status: new FormControl(null,[Validators.required]),
  //   technician_report: new FormControl(null,[Validators.required]),
  //   // holding_reason: new FormControl(null,[Validators.required]),

  //   // used_items_descriptions: new FormControl(null,[Validators.required]),
  // })

  onSubmit(data: FormGroup) {
    if (this.orderId) {
      // Edit Order
      let myData = new FormData();
      let myMap = new Map(Object.entries(data.value));
      for (const [key, value] of myMap) {
        myData.append(key, data.value[key]);
      }

      this._WorkOrdersService.editOrder(data.value, this.orderId).subscribe({
        next: (res) => {
          console.log(data.value)
          this._ToastrService.success('Work Order Updated Succesfuly');
        },
        error: (err) => {
          this._ToastrService.error(err.message, 'Error in Update Order');
        },
        complete: () => {
          this._Router.navigate(['/dashboard/admin/work-orders']);
        }
      })

    }
  }


  getOrderById(id: number) {
    this._WorkOrdersService.getOrder(id).subscribe(
      (res) => {
        this.currentOrder = res.data

        // if (this.currentOrder.status.id == 4) {
        //   this.isHold = true;
        //   (this.updateOrderForm as FormGroup).addControl('holding_reason', new FormControl(null, [Validators.required]))
        //   this.updateOrderForm.patchValue({ holding_reason: this.currentOrder.holding_reason } as any);

        // }
        
        // console.log(this.currentOrder.department.id)
        this.getengineers(this.currentOrder?.department.id)
        this.gettechnicians(this.currentOrder?.department.id)

        this.orderForm.patchValue({
          start_date: this.currentOrder?.start_date,
          department_id: this.currentOrder?.department.id,
          engineer_id: this.currentOrder?.engineer?.id,
          technician_id: this.currentOrder?.technician?.id,
          work_type_id: this.currentOrder?.work_type.id,
          building_id: this.currentOrder?.building.id,
          floor_no: this.currentOrder?.floor_no,
          room_no: this.currentOrder?.room_no,
          customer_name: this.currentOrder?.customer_name,
          customer_phone: this.currentOrder?.customer_phone,
          equipment_id: this.currentOrder?.equipment.id,
          source_id: this.currentOrder?.source.id,
          description: this.currentOrder?.description,
          status: this.currentOrder?.status.id,
          technician_report: this.currentOrder?.technician_report,

        })

        // this.updateOrderForm.patchValue({
        //   status: this.currentOrder?.status.id,
        //   technician_report: this.currentOrder?.technician_report,
        //   // holding_reason: this.currentOrder?.holding_reason,
        // })

      }
    )
  }

  // Update Status

  // onselectStatus(data: FormGroup) {
  //   // console.log(data.value.status)
  //   this.isHold = false
  //   if (data.value.status == 4) {
  //     this.isHold = true;
  //     (this.updateOrderForm as FormGroup).addControl('holding_reason', new FormControl(null, [Validators.required]))
  //   } else {
  //     // this._WorkOrdersService.updateStatus(this.orderId,data.value).subscribe(
  //     //   (res)=>{
  //     //     this._ToastrService.success('Status Updated Succesfuly');
  //     //   }
  //     // )
  //   }
  // }
  
  onupdate(data: FormGroup) {
        this.updateOrderForm.patchValue({
          status: this.currentOrder?.status.id,
          technician_report: this.currentOrder?.technician_report,
          // holding_reason: this.currentOrder?.holding_reason,
        })

      }
    )
  }

    // Update Status

  onselectStatus(data:FormGroup){
    // console.log(data.value.status)
    this.isHold = false
    if(data.value.status == 4){
      this.isHold = true;
      (this.updateOrderForm as FormGroup).addControl('holding_reason',new FormControl(null, [Validators.required]))
    }else{
      // this._WorkOrdersService.updateStatus(this.orderId,data.value).subscribe(
      //   (res)=>{
      //     this._ToastrService.success('Status Updated Succesfuly');
      //   }
      // )
    }
  }

  onupdate(data:FormGroup){
    // console.log(data.value);
    let myData = new FormData();
    let myMap = new Map(Object.entries(data.value));
    for (const [key, value] of myMap) {
      myData.append(key, data.value[key]);
    }

    this._WorkOrdersService.updateOrder(this.orderId, data.value).subscribe(
      (res) => {
        this._ToastrService.success('Order Updated Succesfuly');
      },
      (err) => {
        this._ToastrService.error(err.message, 'Error in Update')
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
        this.departments = res.data

      }
    )
  }
  onselectDepartment() {
    this.getengineers(this.departmentId)
    this.gettechnicians(this.departmentId)
  }
  getengineers(id: number) {
    this._HelperService.getEngineers(id).subscribe(
      (res) => {
        console.log(res.data)
        // console.log(this.departmentId)

        this.engineers = res.data;
      }
    )
  }
  gettechnicians(id: number) {
    this._HelperService.getTechnicians(id).subscribe(
      (res) => {
        console.log(res.data)
        this.technicians = res.data;
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
