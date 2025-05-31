import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HelperService } from 'src/app/services/helper.service';
import { LookupsService } from 'src/app/services/lookups.service';
import { WorkOrdersService } from '../../services/work-orders.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AddMaterialComponent } from './components/add-material/add-material.component';
import { MatDialog } from '@angular/material/dialog';
import { AddSpareComponent } from './components/add-spare/add-spare.component';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.scss']
})
export class EditOrderComponent {
  
  constructor(
    private _activateRoute: ActivatedRoute,
    private _WorkOrdersService: WorkOrdersService,
    private _LookupsService: LookupsService,
    private _ToastrService: ToastrService,
    private _Router: Router,
    private _HelperService: HelperService,
    public dialog: MatDialog,


  ) {
    this.orderId = this._activateRoute.snapshot.paramMap.get('id')

  }

  ngOnInit() {
    this.getOrderById(this.orderId)
    this.getOrderMaterial()
    this.getOrderParts()
    this.getStatus()
    // this.getworkType()
    // this.getBuilding()
    // this.getEqipment()
    // this.getSource()
    // this.getReport()
    // this.getDepartment()

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
      start_date: new FormControl(null, [Validators.required]),
      start_time: new FormControl(new Date().toTimeString().split(' ')[0], [Validators.required]),
      department_id: new FormControl(null, [Validators.required]),
      engineer_id: new FormControl(null, [Validators.required]),
      technician_id: new FormControl(null,),
      work_type_id: new FormControl(null, [Validators.required]),
      building_id: new FormControl(null, [Validators.required]),
      floor_no: new FormControl(null, [Validators.required]),
      room_no: new FormControl(null, [Validators.required]),
      source_id: new FormControl(null, [Validators.required]),
      customer_name: new FormControl(null, [Validators.required]),
      customer_phone: new FormControl(null, [Validators.required]),
      equipment_id: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      priority: new FormControl(null, [Validators.required]),
      type: new FormControl(null,),
      // status: new FormControl(null,[Validators.required])

    }
  );
  updateOrderForm = new FormGroup({
    status: new FormControl(null, [Validators.required]),
    technician_report: new FormControl(null, [Validators.required]),
    // holding_reason: new FormControl(null,[Validators.required]),

    // used_items_descriptions: new FormControl(null,[Validators.required]),
  })


  onSubmit(data: FormGroup) {
    if (this.orderId) {
      // Edit Order
      // let myData = new FormData();
      // let myMap = new Map(Object.entries(data.value));
      // for (const [key, value] of myMap) {
      //   myData.append(key, data.value[key]);
      // }

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
    this._WorkOrdersService.getOrder(id).subscribe({
      next: (res) => {
        this.currentOrder = res.data
        if (this.currentOrder.status == 4) {
          if (this.currentOrder.status.id == 4) {
            this.isHold = true;
            (this.updateOrderForm as FormGroup).addControl('holding_reason', new FormControl(null, [Validators.required]))
            this.updateOrderForm.patchValue({ holding_reason: this.currentOrder.holding_reason } as any);

          }
          // this.getengineers(this.currentOrder?.department.id)
          // this.gettechnicians(this.currentOrder?.department.id)

          this.orderForm.patchValue({
            start_date: this.currentOrder?.start_date,
            department_id: this.currentOrder?.department?.name,
            engineer_id: this.currentOrder?.engineer?.name,
            technician_id: this.currentOrder?.technician?.name,
            work_type_id: this.currentOrder?.work_type.name,
            building_id: this.currentOrder?.building.name,
            floor_no: this.currentOrder?.floor_no,
            room_no: this.currentOrder?.room_no,
            customer_name: this.currentOrder?.customer_name,
            customer_phone: this.currentOrder?.customer_phone,
            equipment_id: this.currentOrder?.equipment.name,
            source_id: this.currentOrder?.source.name,
            description: this.currentOrder?.description,

          })

          this.updateOrderForm.patchValue({
            status: this.currentOrder?.status.id,
            technician_report: this.currentOrder?.technician_report,
            // holding_reason: this.currentOrder?.holding_reason,
          })

      }
    })
  }

  // Update Status

  onselectStatus(data: FormGroup) {
    // console.log(data.value.status)
    this.isHold = false
    if (data.value.status == 4) {
      this.isHold = true;
      (this.updateOrderForm as FormGroup).addControl('holding_reason', new FormControl(null, [Validators.required]))
    } else {

      (this.updateOrderForm as FormGroup).addControl('holding_reason', new FormControl(null, [Validators.required]))
      (this.updateOrderForm as FormGroup).addControl('holding_reason',new FormControl(null, [Validators.required]))
    }else{
      // this._WorkOrdersService.updateStatus(this.orderId,data.value).subscribe(
      //   (res)=>{
      //     this._ToastrService.success('Status Updated Succesfuly');
      //   }
      // )
    }
  }
  onupdate(data: FormGroup) {
    // console.log(data.value);
    let myData = new FormData();
    let myMap = new Map(Object.entries(data.value));
    for (const [key, value] of myMap) {
      myData.append(key, data.value[key]);
    }
    this._WorkOrdersService.updateOrder(this.orderId, data.value).subscribe({
      next: (res) => {
        this._ToastrService.success('Order Updated Succesfuly');
      },
      error: (err) => {
        this._ToastrService.error(err.message, 'Error in Update')
      }
    })

  }
  // start Material 

  openMaterialDialog() {
    const dialogRef = this.dialog.open(AddMaterialComponent, {
      data: this.orderId,
    });


    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
      if (result) {
        this.addMaterial(result)
        this.getOrderMaterial()
      }
    });
  }

  addMaterial(data: FormGroup) {
    let myData = new FormData();
    let myMap = new Map(Object.entries(data.value));
    for (const [key, value] of myMap) {
      myData.append(key, data.value[key]);
    }
    this._WorkOrdersService.addMaterial(myData).subscribe({
      next: (res) => {
        this.getOrderMaterial()
        this._ToastrService.success(res.message, 'Work Order Added Succesfuly');
      },
      error: (err) => {
        this._ToastrService.error(err.message, 'Error in Update Order');
      },
      complete: () => {

      }

    })
  }

  deleteMaterialById(id: number) {
    this._WorkOrdersService.deleteMaterial(id).subscribe({
      next: (res) => {
        this.getOrderMaterial()
        this._ToastrService.success(res.message, 'deleted Succesfuly');
      },
      error: (err) => {
        this._ToastrService.error(err.message, ' Error in delete');

      },
      complete: () => {
      }

    })
  }
  getOrderMaterial() {
    this._WorkOrdersService.getMaterialByOrderId(this.orderId).subscribe({
      next: (res) => {
        this.materialTableData = res.data

      }
    })
  }

  // start parts 
  openPartsDialog() {
    const dialogRef = this.dialog.open(AddSpareComponent, {
      data: this.orderId,
    });


    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
      if (result) {
        this.addParts(result)
        this.getOrderParts()
      }
    });
  }

  addParts(data: FormGroup) {
    let myData = new FormData();
    let myMap = new Map(Object.entries(data.value));
    for (const [key, value] of myMap) {
      myData.append(key, data.value[key]);
    }
    this._WorkOrdersService.addParts(myData).subscribe({
      next: (res) => {
        this._ToastrService.success(res.message, 'Work Order Added Succesfuly');
        this.getOrderParts()
      },
      error: (err) => {
        this._ToastrService.error(err.message, 'Error in Update Order');
      },
      complete: () => {

      }

    })
  }

  deletePartsById(id: number) {
    this._WorkOrdersService.deleteParts(id).subscribe({
      next: (res) => {
        this.getOrderParts()
        this._ToastrService.success(res.message, 'deleted Succesfuly');
      },
      error: (err) => {
        this._ToastrService.error(err.message, ' Error in delete');

      },
      complete: () => {
      }

    })
  }
  getOrderParts() {
    this._WorkOrdersService.getPartsByOrderId(this.orderId).subscribe({
      next: (res) => {
        this.spareTableData = res.data
      }
    })
  }

  // lookups

  getStatus() {
    this._LookupsService.getStatus().subscribe({
      next: (res) => {
        this.status = res.data
      }
    })
  }

}