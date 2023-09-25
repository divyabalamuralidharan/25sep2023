import { Component, OnInit } from '@angular/core';
import { trigger, transition, animate, style } from '@angular/animations';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { DynamicGrid } from './contract.model';
import { AppraisalService } from 'src/app/common-services/appraisal.service';
import Swal from 'sweetalert2';
import { TopmenuComponent } from './../topmenu/topmenu.component';
import { DatePipe } from '@angular/common';// added for VRR-791
import { validateCurrency } from 'src/app/common-TS/commonFun';
declare var $: any;

@Component({
  selector: 'app-buildingdetails',
  templateUrl: './buildingdetails.component.html',
  styleUrls: ['./buildingdetails.component.css'],
  animations: [
    trigger('FadeAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(600)
      ])
    ])
  ]
})

export class BuildingdetailsComponent implements OnInit {
  dynamicArray = [];
  newDynamic: any = {};
  contactArray: Array<DynamicGrid> = [];
  newContact: any = {};
  DimensionDynamicGrid: Array<DynamicGrid> = [];
  newDimension: any = {};
  IssueDate;
  UserId;
  ValuationID;
  Appraisalstatus;
  PropertyType;
  PropertyID;
  BorrowerID;
  BuildingDetails;
  AssignedDate;
  Address;
  PropertyID1;
  ValuationFloor = [];
  checkFloorNum = []
  dynamicArrayd: boolean = false;
  contactArrayc: boolean = false;
  addbtnd: boolean = false;
  fileExt;
  cunstruction;
  cunstructiontxt;
  proof;
  dynamicFile1: any = [];
  dynamicFile2: any = [];
  approvalValidityStartDate;
  ApprovalValidityEndDate;
  StructureofBuilding;
  otherConstruction: boolean = false;
  Boundary = [];
  multiBoundary = [];
  ApprovalDate;
  ApprovalValidityDate;
  create_form;
  sucess_wrapper = false;
  repeatableFieldsnew;
  repeatableFields = [];
  UOMaddedbyUser;
  rowforPolygon;
  dimensionofProperty = [];
  StructureofBuildingOthers:any;
  TotalPlinthArea:any;
  BuildingStructure = ["Main Building", "Clubhouse", "Security room", "Generator room", "Temple", "Swimming Pool", "STP", "Others"]
  updateBuilding:any = []
  updateBuildingName:any = []
 // UOM = ["Hectare", "Acre", "Ground", "Cent", "Are", ];
 // constantUOM = ["Hectare", "Acre", "Ground", "Cent", "Are", "R.ft", "R.M", "Others"];
  UOM=["R.ft", "R.M", "Others"];
  constantUOM=["R.ft", "R.M", "Others"];
  Buildingdetails = new FormGroup({
    extentAsPerDeed: new FormControl(''),
    extentActual: new FormControl(''),
    unitAsPerDeed: new FormControl(''),
    unitActual: new FormControl(''),
    buildingInsured: new FormControl('Yes'),
    insuredvalue: new FormControl(''),
    typeofConstruction: new FormControl(''),
    typeofConstructionTxt: new FormControl(''),
    compound: new FormControl(''),
    building: new FormControl(''),
    quality: new FormControl(''),
    buildingInterior: new FormControl(''),
    buildingExterior: new FormControl(''),
    cunstruction: new FormControl(''),
    cunstructiontxt: new FormControl(''),
  });
  buildingdetails = new FormGroup({
    liveableCondition: new FormControl(''),
    occupiedbyTenant: new FormControl(''),
    occupied: new FormControl(''),
    grossMonthrent: new FormControl(''),
    grossAdvanceAmount: new FormControl(''),
    Proof: new FormControl('Yes'),
    currentTenant: new FormControl(''),
    dateYMD: new FormControl(new Date()),
    validityLayout: new FormControl(''),
    approvedAuthority: new FormControl(''),
    information: new FormControl(''),
    completionCertificate: new FormControl(''),
    approvingAuthorities: new FormControl(''),
    // new fields from statutory release46.1
    additionalNotesAppro: new FormControl(''),
    projectApproved: new FormControl(''),
    approvAuthority: new FormControl(''),
    approvalNo: new FormControl(''),
  });
approvalValiditiyMinDate:any;
  constructor(private AppService: AppraisalService, private route: ActivatedRoute, private router: Router, private topMenu: TopmenuComponent,
    private datePipe: DatePipe) { }
  row = [
    {
      name: 'North',
      papd: '',
      pa: '',
      dapd: '',
      da: '',
    },
    {
      name: 'South',
      papd: '',
      pa: '',
      dapd: '',
      da: '',
    },
    {
      name: 'East',
      papd: '',
      pa: '',
      dapd: '',
      da: '',
    },
    {
      name: 'West',
      papd: '',
      pa: '',
      dapd: '',
      da: '',
    },
    {
      name: 'Extent',
      papd: '',
      pa: '',
      dapd: '',
      da: '',
    },
  ];
  row_ = [0]

  rowforPolygon1 = [
    {
      Direction: 'Side 1',
      Side: '',
      DimensionAsPerActual: '',
      UnitAsPerActual: '',
      DimensionAsPerDeed: '',
      UnitAsPerSale: '',
      ConvertedSales: '',
      ConvertedUnit: '',
      Variation: '',
      VariationUnit: '',
      Remarks: '',
    }, {
      Direction: 'Side 2',
      Side: '',
      DimensionAsPerActual: '',
      UnitAsPerActual: '',
      DimensionAsPerDeed: '',
      UnitAsPerSale: '',
      ConvertedSales: '',
      ConvertedUnit: '',
      Variation: '',
      VariationUnit: '',
      Remarks: '',
    }, {
      Direction: 'Side 3',
      Side: '',
      DimensionAsPerActual: '',
      UnitAsPerActual: '',
      DimensionAsPerDeed: '',
      UnitAsPerSale: '',
      ConvertedSales: '',
      ConvertedUnit: '',
      Variation: '',
      VariationUnit: '',
      Remarks: '',
    }, {
      Direction: 'Side 4',
      Side: '',
      DimensionAsPerActual: '',
      UnitAsPerActual: '',
      DimensionAsPerDeed: '',
      UnitAsPerSale: '',
      ConvertedSales: '',
      ConvertedUnit: '',
      Variation: '',
      VariationUnit: '',
      Remarks: '',
    },
    {
      Direction: 'Side 5',
      DimensionAsPerActual: '',
      UnitAsPerActual: '',
      DimensionAsPerDeed: '',
      UnitAsPerSale: '',
      ConvertedSales: '',
      ConvertedUnit: '',
      Variation: '',
      VariationUnit: '',
      Remarks: '',
    }, {
      Direction: 'Side 6',
      DimensionAsPerActual: '',
      UnitAsPerActual: '',
      DimensionAsPerDeed: '',
      UnitAsPerSale: '',
      ConvertedSales: '',
      ConvertedUnit: '',
      Variation: '',
      VariationUnit: '',
      Remarks: '',
    }, {
      Direction: 'Diagonal 1',
      DimensionAsPerActual: '',
      UnitAsPerActual: '',
      DimensionAsPerDeed: '',
      UnitAsPerSale: '',
      ConvertedSales: '',
      ConvertedUnit: '',
      Variation: '',
      VariationUnit: '',
      Remarks: '',
    }, {
      Direction: 'Diagonal 2',
      DimensionAsPerActual: '',
      UnitAsPerActual: '',
      DimensionAsPerDeed: '',
      UnitAsPerSale: '',
      ConvertedSales: '',
      ConvertedUnit: '',
      Variation: '',
      VariationUnit: '',
      Remarks: '',
    }, {
      Direction: 'Extent',
      DimensionAsPerActual: '',
      UnitAsPerActual: '',
      DimensionAsPerDeed: '',
      UnitAsPerSale: '',
      ConvertedSales: '',
      ConvertedUnit: '',
      Variation: '',
      VariationUnit: '',
      Remarks: '',
    },
  ]

  dimensionArray = [
    {
      Direction: 'North',
      DimensionAsPerActual: '',
      UnitAsPerActual: '',
      DimensionAsPerDeed: '',
      UnitAsPerSale: '',
      ConvertedSales: '',
      ConvertedUnit: '',
      Variation: '',
      VariationUnit: '',
      Remarks: '',
    }, {
      Direction: 'South',
      DimensionAsPerActual: '',
      UnitAsPerActual: '',
      DimensionAsPerDeed: '',
      UnitAsPerSale: '',
      ConvertedSales: '',
      ConvertedUnit: '',
      Variation: '',
      VariationUnit: '',
      Remarks: '',
    }, {
      Direction: 'East',
      DimensionAsPerActual: '',
      UnitAsPerActual: '',
      DimensionAsPerDeed: '',
      UnitAsPerSale: '',
      ConvertedSales: '',
      ConvertedUnit: '',
      Variation: '',
      VariationUnit: '',
      Remarks: '',
    }, {
      Direction: 'West',
      DimensionAsPerActual: '',
      UnitAsPerActual: '',
      DimensionAsPerDeed: '',
      UnitAsPerSale: '',
      ConvertedSales: '',
      ConvertedUnit: '',
      Variation: '',
      VariationUnit: '',
      Remarks: '',
    },
    {
      Direction: 'Extent',
      DimensionAsPerActual: '',
      UnitAsPerActual: '',
      DimensionAsPerDeed: '',
      UnitAsPerSale: '',
      ConvertedSales: '',
      ConvertedUnit: '',
      Variation: '',
      VariationUnit: '',
      Remarks: '',
    }
  ];

  ngOnInit(): void {
    this.sucess_wrapper = false;
    this.UOMaddedbyUser = []
    this.multiBoundary = []
    this.Boundary = []
    this.UserId = sessionStorage.getItem('UserId');
    this.ValuationID = sessionStorage.getItem('ValuationID');
    this.Appraisalstatus = sessionStorage.getItem('Appraisalstatus');
    this.PropertyType = sessionStorage.getItem('PropertyType');
    //loading data
    $('#rentAgreementpdf').css('display', 'none')
    this.newDimension = [
      {
        Direction: 'North',
        DimensionAsPerActual: '',
        UnitAsPerActual: '',
        DimensionAsPerDeed: '',
        UnitAsPerSale: '',
        ConvertedSales: '',
        ConvertedUnit: '',
        Variation: '',
        VariationUnit: '',
        Remarks: '',
      }, {
        Direction: 'South',
        DimensionAsPerActual: '',
        UnitAsPerActual: '',
        DimensionAsPerDeed: '',
        UnitAsPerSale: '',
        ConvertedSales: '',
        ConvertedUnit: '',
        Variation: '',
        VariationUnit: '',
        Remarks: '',
      }, {
        Direction: 'East',
        DimensionAsPerActual: '',
        UnitAsPerActual: '',
        DimensionAsPerDeed: '',
        UnitAsPerSale: '',
        ConvertedSales: '',
        ConvertedUnit: '',
        Variation: '',
        VariationUnit: '',
        Remarks: '',
      }, {
        Direction: 'West',
        DimensionAsPerActual: '',
        UnitAsPerActual: '',
        DimensionAsPerDeed: '',
        UnitAsPerSale: '',
        ConvertedSales: '',
        ConvertedUnit: '',
        Variation: '',
        VariationUnit: '',
        Remarks: '',
      },
      {
        Direction: 'Extent',
        DimensionAsPerActual: '',
        UnitAsPerActual: '',
        DimensionAsPerDeed: '',
        UnitAsPerSale: '',
        ConvertedSales: '',
        ConvertedUnit: '',
        Variation: '',
        VariationUnit: '',
        Remarks: '',
      }
    ];
  this.newDynamic = [{ floor: "0", reported: "", observed: "", deed: "", completed: "" }];
  // this.dynamicArray.push(this.newDynamic);
  this.newContact = [{ floor1: "0", roof: "", plinthAreaMain : "", plinthAreaCantilevered: "", plinthAreaTotal: "", roomDetail: "" }];
  // this.contactArray.push(this.newContact);

    

    this.repeatableFieldsnew = {
      rows: [0],
      // StructureofBuilding: 'New Building',  //changed by saranya
      StructureofBuilding: 'Main Building',  //changed by Naveen
      Shape: 'Regular',
      dynamicFile1: [],
      dynamicFile2: [],
      BuildingInsured: '',
      TypeofConstruction: '',
      TypeofConstructionRemarks: '',
      compound: '',
      ApperanceOfBuilding: '',
      Construction: '',
      Remarks: '',
      dimensionofProperty: [[
        {
          Direction: 'North',
          DimensionAsPerActual: '',
          UnitAsPerActual: '',
          DimensionAsPerDeed: '',
          UnitAsPerSale: '',
          ConvertedSales: '',
          ConvertedUnit: '',
          Variation: '',
          VariationUnit: '',
          Remarks: '',
        }, {
          Direction: 'South',
          DimensionAsPerActual: '',
          UnitAsPerActual: '',
          DimensionAsPerDeed: '',
          UnitAsPerSale: '',
          ConvertedSales: '',
          ConvertedUnit: '',
          Variation: '',
          VariationUnit: '',
          Remarks: '',
        }, {
          Direction: 'East',
          DimensionAsPerActual: '',
          UnitAsPerActual: '',
          DimensionAsPerDeed: '',
          UnitAsPerSale: '',
          ConvertedSales: '',
          ConvertedUnit: '',
          Variation: '',
          VariationUnit: '',
          Remarks: '',
        }, {
          Direction: 'West',
          DimensionAsPerActual: '',
          UnitAsPerActual: '',
          DimensionAsPerDeed: '',
          UnitAsPerSale: '',
          ConvertedSales: '',
          ConvertedUnit: '',
          Variation: '',
          VariationUnit: '',
          Remarks: '',
        },
        {
          Direction: 'Extent',
          DimensionAsPerActual: '',
          UnitAsPerActual: '',
          DimensionAsPerDeed: '',
          UnitAsPerSale: '',
          ConvertedSales: '',
          ConvertedUnit: '',
          Variation: '',
          VariationUnit: '',
          Remarks: '',
        }
      ]],
      BuildingInterior: '',
      BuildingExterior: '',
      GrossAdvanceAmount: '',
      GrossMonthrent: '',
      liveableCondition: '',
      occupied: '',
      occupiedbyTenant: '',
      currentTenant: '',
      Proof: '',
      dynamicArray: this.newDynamic,
      contactArray: this.newContact,
      buildConstruct: '',
      buildConstructtxt: '',
      extentofBuilding: '',
      Dateofissue:'',
      validityLayout:'',
      approvedAuthority:'',
      approvingAuthorities:'',
      ApprovalDate:'',
      ApprovalValidityStartDate:'',
      ApprovalValidityEndDate:'',
      additionalNotesAppro:'',
      completionCertificate:'',
    }

    this.repeatableFields.push(this.repeatableFieldsnew)
    this.rowforPolygon = []
    this.rowforPolygon.push(this.rowforPolygon1)
    this.OnLoadGetdata(this.Appraisalstatus);
  }

  addNewRow(r, index) {
    for (var i = 0; i < this.repeatableFields[r]['dynamicArray'].length; i++) {
      if (this.repeatableFields[r]['dynamicArray'][i].floor == '' || this.repeatableFields[r]['dynamicArray'][i].reported == '' || this.repeatableFields[r]['dynamicArray'][i].observed == '' || this.repeatableFields[r]['dynamicArray'][i].deed == '' || this.repeatableFields[r]['dynamicArray'][i].completed == '') {
        Swal.fire("", "Please fill Construction House / Apartment Details..", "info")
        return false
      }
    }
    for (var i = 0; i < this.repeatableFields[r]['contactArray'].length; i++) {
      if (this.repeatableFields[r]['contactArray'][i].floor1 == '' || this.repeatableFields[r]['contactArray'][i].roof == '' || this.repeatableFields[r]['contactArray'][i].plinthAreaMain == '' 
      || this.repeatableFields[r]['contactArray'][i].plinthAreaCantilevered == '' || this.repeatableFields[r]['contactArray'][i].plinthAreaTotal == '' || this.repeatableFields[r]['contactArray'][i].roomDetail == '' || this.repeatableFields[r]['contactArray'][i].roomDetail == undefined) {
        Swal.fire("", "Please fill Floor(Plinth & Cantilevered) Details..", "info")
        return false
      }
    }
    let floor: any = ''
    floor = index + 1
    this.newDynamic = { floor: floor, reported: "", observed: "", deed: "", completed: "" };
    this.repeatableFields[r]['dynamicArray'].push(this.newDynamic);
    this.newContact = { floor1: floor, roof: "", plinthAreaMain : "", plinthAreaCantilevered: "", plinthAreaTotal: "", roomDetail: "" };
    this.repeatableFields[r]['contactArray'].push(this.newContact);
    this.displayAddBtn(r)
    return true;
  }

  deleteRow(index: number, r) {
    if (this.repeatableFields[r]['dynamicArray'].length == 1) {
      return false;
    } else if (this.repeatableFields[r]['dynamicArray'][index].floor != "") {
      if (this.repeatableFields[r]['dynamicArray'][index].floor != "" && this.repeatableFields[r]['dynamicArray'][index].floor != undefined)
        if (this.ValuationFloor.includes(this.repeatableFields[r]['dynamicArray'][index].floor)) {
          Swal.fire("", "You can't remove this Floor Details,Floor Number Exists in Life of Building Estimated details", "info")
          return
        } else {
          this.repeatableFields[r]['dynamicArray'].splice(index, 1);
          this.repeatableFields[r]['contactArray'].splice(index, 1);
          // updating the floor no after deleted the row - added by Naveen
          for (let i = 0; i < this.repeatableFields[r]['dynamicArray'].length; i++) {
            this.repeatableFields[r]['dynamicArray'][i].floor = i.toString()
            this.repeatableFields[r]['contactArray'][i].floor1 = i.toString()
          }
          this.plinthAreaTotal(r)
          this.displayAddBtn(r)
          return true;
        }
    }
    else {
      this.repeatableFields[r]['dynamicArray'].splice(index, 1);
      this.repeatableFields[r]['contactArray'].splice(index, 1);
      // updating the floor no after deleted the row - added by Naveen
      for (let i = 0; i < this.repeatableFields[r]['dynamicArray'].length; i++) {
        this.repeatableFields[r]['dynamicArray'][i].floor = i.toString()
        this.repeatableFields[r]['contactArray'][i].floor1 = i.toString()
      }
      this.plinthAreaTotal(r)
      this.displayAddBtn(r)
      return true;
    }
  }


  floorNum(index: number, event: any, r) {
    var Floor;
    let duplicateFloor = [];
    $(document.querySelectorAll('#contactfloor' + r)[index]).val($(document.querySelectorAll('#dynamicfloor' + r)[index]).val());
    for (var i = 0; i < this.repeatableFields[r]['dynamicArray'].length; i++) {
      Floor = this.repeatableFields[r]['dynamicArray'][i].floor;
      duplicateFloor.push(Floor)
      // this.contactArray[index].floor = Floor.toString();
      this.repeatableFields[r]['contactArray'][index].floor1 = $(document.querySelectorAll('#dynamicfloor'+ r)[index]).val().toString();
      if (i != index && event.target.value != "") {
        if (this.repeatableFields[r]['dynamicArray'][i].floor.includes(event.target.value)) {
          Swal.fire("", "Entered Floor Number Already Exists", "info")
          $(document.querySelectorAll('#dynamicfloor'+ r)[index]).val('')
          $(document.querySelectorAll('#contactfloor'+ r)[index]).val('')
          this.repeatableFields[r]['contactArray'][index].floor1 = ""
          this.repeatableFields[r]['dynamicArray'][index].floor = ""
          return
        }
      }

    }
  }

  sideMenuToggle() {
    $('.sidebar-float').toggleClass('open');
  }

  dateValue(datetext: any) //fix for VRR-791
  {
    if (datetext != null || datetext != undefined || datetext != '')
      if (datetext.toString().indexOf('-') > 0) {
        var SplitDate = datetext.toString().split('-')
        return new Date(SplitDate[2] + '-' + SplitDate[1] + '-' + SplitDate[0]);
      } else {
        return datetext;
      }
  }

  fnsaveBuilddetails(opt: any) {
    //VRR-836 - release 46
    let structureValue = this.repeatableFields.filter(obj => obj.StructureofBuilding === 'Main Building');
    if (structureValue) {
      if (structureValue.length > 1) {
        Swal.fire('', 'You have entered more than one Dimension for Main Building', 'info');
        return;
      }
      else if (structureValue.length < 1) {
        Swal.fire('', 'Please enter the Dimension of Main Building', 'info');
        return;
      }
    } else if (structureValue.length < 1) {
      Swal.fire('', 'Please enter the Dimension of Main Building', 'info');
      return;
    }
        if(this.PropertyType!='Land') //VRR-938 issue fix
    {
    try { //Added by saranya
      this.repeatableFields.map((value, index) => {
        value.StructureofBuilding=value.StructureofBuilding.trim();
        if (value.StructureofBuilding === 'New Building'||value.StructureofBuilding=='') {

          Swal.fire('', 'Please enter the Structure for New Building', 'info');
          throw 'StructureMissing'; // Throw an exception to exit the code execution

        }
      });
    } catch (error) {
      if (error === 'StructureMissing') {
        return; // Handle the exception here, if needed
      }
      throw error; // Rethrow the error if it's not the one we're handling
    }
  }
    try { //VRR-784 issue fix - release 46
      this.repeatableFields.map((value, index) => {
        if (value.Construction === 'Bad') {
          if (value.Remarks === '') {
            Swal.fire('', 'Please enter your Remarks for Quality of Construction', 'info');
            throw 'RemarksMissing'; // Throw an exception to exit the code execution
          }
        }
      });
    } catch (error) {
      if (error === 'RemarksMissing') {
        return; // Handle the exception here, if needed
      }
      throw error; // Rethrow the error if it's not the one we're handling
    }
    let buiildingName = this.validateStructureName()
    if(!buiildingName) return;
    //check weather the field not an empty and undefined
    if (this.ApprovalValidityEndDate != undefined && this.ApprovalValidityEndDate != null && this.ApprovalValidityEndDate != "" && this.approvalValidityStartDate != undefined && this.approvalValidityStartDate != null && this.approvalValidityStartDate != "") {
      // Check if the end date is before the start date
      if (this.dateValue(this.ApprovalValidityEndDate) < this.dateValue(this.approvalValidityStartDate)) {
        // Show an information message using Swal (SweetAlert) library
        Swal.fire(" ", "The Start Date should not be after the end date", "info")
        // Exit the function and stop further execution
        return
      }
    }

    let totalValue = []
    this.multiBoundary = []
    let object1 = {}
    // for (let row = 0; row < this.row_.length; row++) {

    //   object1 = {}
    //   for (let i = 0; i < 4; i++) {
    //     if (i == 0) {
    //       object1['NorthPropertyAsPerDeed'] = $('#PropertyAsPerDeed' + row + i).val()
    //       object1['NorthPropertyActual'] = $('#dimensionAsPerActual' + row + i).val()
    //       object1['NorthDimensionAsPerDeed'] = $('#DimensionAsPerDeed' + row + i).val()
    //       object1['NorthDimensionActual'] = $('#DimensionActual' + row + i).val()
    //     }
    //     if (i == 1) {
    //       object1['SouthPropertyAsPerDeed'] = $('#PropertyAsPerDeed' + row + i).val()
    //       object1['SouthPropertyActual'] = $('#dimensionAsPerActual' + row + i).val()
    //       object1['SouthDimensionAsPerDeed'] = $('#DimensionAsPerDeed' + row + i).val()
    //       object1['SouthDimensionActual'] = $('#DimensionActual' + row + i).val()
    //     }
    //     if (i == 2) {
    //       object1['EastPropertyAsPerDeed'] = $('#PropertyAsPerDeed' + row + i).val()
    //       object1['EastPropertyActual'] = $('#dimensionAsPerActual' + row + i).val()
    //       object1['EastDimensionAsPerDeed'] = $('#DimensionAsPerDeed' + row + i).val()
    //       object1['EastDimensionActual'] = $('#DimensionActual' + row + i).val()
    //     }
    //     if (i == 3) {
    //       object1['WestPropertyAsPerDeed'] = $('#PropertyAsPerDeed' + row + i).val()
    //       object1['WestPropertyActual'] = $('#dimensionAsPerActual' + row + i).val()
    //       object1['WestDimensionAsPerDeed'] = $('#DimensionAsPerDeed' + row + i).val()
    //       object1['WestDimensionActual'] = $('#DimensionActual' + row + i).val()
   
    //     }
    //   }
    //   totalValue[row] = object1
    // }

    for  (let r = 0; r < this.repeatableFields.length; r++) {
      for  (let i = 0; i < this.repeatableFields[r].dynamicArray.length; i++) {
        this.repeatableFields[r].dynamicArray[i].structure=this.repeatableFields[r].StructureofBuilding
      }
      for  (let i = 0; i < this.repeatableFields[r].contactArray.length; i++) {
        this.repeatableFields[r].contactArray[i].structure=this.repeatableFields[r].StructureofBuilding    
      }  
    }

    this.multiBoundary = totalValue
    // this.buildingdetails.value.grossMonthrent = this.buildingdetails.value.grossMonthrent.toString().replaceAll(',', '')
    // this.buildingdetails.value.grossAdvanceAmount = this.buildingdetails.value.grossAdvanceAmount.toString().replaceAll(',', '')
    this.repeatableFields.map((x)=>{
      if(x.GrossAdvanceAmount)
      x.GrossAdvanceAmount = x.GrossAdvanceAmount.toString().replaceAll(',', '')
      if(x.extentofBuilding)
      x.extentofBuilding = x.extentofBuilding.toString().replaceAll(',', '')
      if(x.buildingInsured)
      x.buildingInsured = x.buildingInsured.toString().replaceAll(',', '')
      if(x.GrossMonthrent)
      x.GrossMonthrent = x.GrossMonthrent.toString().replaceAll(',', '')
    })
    const obj = { //save the value as an object..
      'dynamicarray': this.dynamicArray,
      'contactarray': this.contactArray,
      'PropertyType': this.PropertyType,
      'IrregularSketch': this.dynamicFile1,
      'RentAgreement': this.dynamicFile2,
      'ValidityOfLayout': this.buildingdetails.value.validityLayout,
      'ApprovedAuthority': this.buildingdetails.value.approvedAuthority,
      'AdditionalApprovingAuthorities': this.buildingdetails.value.approvingAuthorities,
      'CompletionCertificateNumber': this.buildingdetails.value.completionCertificate,
      'AdditionalNotesAppro': this.buildingdetails.value.additionalNotesAppro,
      'ProjectApproved': this.buildingdetails.value.projectApproved,
      'ApprovAuthority': this.buildingdetails.value.approvAuthority,
      'ApprovalNo': this.buildingdetails.value.approvalNo,
      //added for VRR-836 Release 46 -by Saranya  
      'PropertyDetails': this.repeatableFields,
      'TotalPlinthArea':this.TotalPlinthArea
    }
    for(var r=0;r<this.repeatableFields.length;r++){
    if (this.repeatableFields[r].Dateofissue == '' ||
    this.repeatableFields[r].Dateofissue == undefined ||
    this.repeatableFields[r].Dateofissue == null) {
    $('#issuedate'+r).val()
  } else {
    var issDate = $('#issuedate'+r).val().trim()
    obj['Dateofissue'] = this.dateValue(issDate)
    this.repeatableFields[r].Dateofissue=obj['Dateofissue']
  }

  if (this.repeatableFields[r].ApprovalValidityStartDate == '' ||
    this.repeatableFields[r].ApprovalValidityStartDate == undefined ||
    this.repeatableFields[r].ApprovalValidityStartDate == null) {
    $('#ApprovalValidityDate'+r).val()
  } else {
    var ApprovalValidityDate = $('#ApprovalValidityDate'+r).val().trim()
    this.repeatableFields[r].ApprovalValidityStartDate= this.dateValue(ApprovalValidityDate)
  }
  if (this.repeatableFields[r].ApprovalValidityEndDate == '' ||
    this.repeatableFields[r].ApprovalValidityEndDate == undefined ||
    this.repeatableFields[r].ApprovalValidityEndDate == null) {
    $('#ApprovalValidityDate2'+r).val()
  } else {
    var ApprovalValidity = $('#ApprovalValidityDate2'+r).val().trim()
    obj['ApprovalValidityEndDate'] = this.dateValue(ApprovalValidity)
  }
  if (this.repeatableFields[r].ApprovalDate == '' ||
    this.repeatableFields[r].ApprovalDate == undefined ||
    this.repeatableFields[r].ApprovalDate == null) {
    $('#ApprovalDate'+r).val()
  } else {
    var ApprovalDate = $('#ApprovalDate'+r).val().trim()
    obj['ApprovalDate'] = this.dateValue(ApprovalDate)
  }

}
  //  var issDate = $('#issuedate').val().trim()
    // var ApprovalValidityDate = $('#ApprovalValidityDate').val().trim()
    // var ApprovalDate = $('#ApprovalDate').val().trim()
    // var ApprovalValidity = $('#ApprovalValidityDate2').val().trim()
    // obj['ApprovalValidityEndDate'] = this.dateValue(ApprovalValidity)
   
    // obj['ApprovalValidityDate'] = this.dateValue(ApprovalValidityDate)
    // obj['ApprovalDate'] = this.dateValue(ApprovalDate)

    if (this.UOMaddedbyUser != undefined && this.UOMaddedbyUser.length != 0)
      obj['UMOUserGiven'] = this.UOMaddedbyUser;

    //fix for VRR-791 ending
    var buildingDetails = {
      'BuildingDetails': JSON.stringify(obj),
      'UserId': this.UserId,
      'ValuationID': this.ValuationID
    }
    this.AppService.PropertyBuildingdetailSave(buildingDetails).subscribe((res) => {
      if (res) {
        Swal.fire({
          title: 'Building Details',
          text: 'Successfully Saved',
          icon: 'success',
          showCancelButton: false,
          allowOutsideClick: false, 
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.isConfirmed) {
            $(document.querySelectorAll('#active2')).show()
            $(document.querySelectorAll('#Inactive02')).hide()
            this.topMenu.ngOnInit();
            setTimeout(() => {
              if (opt == 'continue') {
                this.router.navigate(['/detailview/id/amenities']);  // changed to amenities
                $('html,body').animate({ scrollTop: 0 }, "slow");
              }
              window.scrollTo(0, 0)
              document.documentElement.scrollTop = 0
              document.body.scrollTop = 0
            }, 100)
          }
        });
      }
      else {
        Swal.fire('', 'error', 'info');
      }
    });
  }

  OnLoadGetdata(Appraisalstatus) {
    const obj = {
      'ValuationID': this.ValuationID
    }
    this.AppService.GetValuationIddetails(obj).subscribe(res => {
      this.PropertyID = res[0].PropertyID
      this.getaddress(res[0].PropertyID)
      this.getusername(res[0].BorrowerID);
      this.AssignedDate = this.formatDate(res[0].AssignDate);


      if (res[0].BuildingDetails != undefined)// Code added for Release 44.1
      {
        /*   added for VRR-836 Release 46 -by Saranya   Code started */
        this.repeatableFields = []
        if (res[0].BuildingDetails.UMOUserGiven != undefined) {
          this.UOMaddedbyUser = res[0].BuildingDetails.UMOUserGiven
          this.UOM.push(this.UOMaddedbyUser)
        }
        res[0].BuildingDetails.PropertyDetails.map((x,i)=>{
          if(x.GrossAdvanceAmount){
            if(parseFloat(x.GrossAdvanceAmount) > 999){
              x.GrossAdvanceAmount = parseFloat(x.GrossAdvanceAmount).toFixed(2).replace(/(\d)(?=(\d{2})+\d\.)/g, '$1,')
            }
          }
          if(x.extentofBuilding){
            if(parseFloat(x.extentofBuilding) > 999)
            x.extentofBuilding = parseFloat(x.extentofBuilding).toFixed(2).replace(/(\d)(?=(\d{2})+\d\.)/g, '$1,')
          }
          if(x.buildingInsured){
            if(parseFloat(x.buildingInsured) > 999)
            x.buildingInsured = parseFloat(x.buildingInsured).toFixed(2).replace(/(\d)(?=(\d{2})+\d\.)/g, '$1,')
          }
          if(x.GrossMonthrent){
            if(parseFloat(x.GrossMonthrent) > 999)
            x.GrossMonthrent = parseFloat(x.GrossMonthrent).toFixed(2).replace(/(\d)(?=(\d{2})+\d\.)/g, '$1,')
          }
        })
        if(res[0].BuildingDetails.TotalPlinthArea!=undefined)
        this.TotalPlinthArea=res[0].BuildingDetails.TotalPlinthArea
      else
      this.TotalPlinthArea=''
        if (res[0].BuildingDetails.PropertyDetails != undefined) {
          for (let r = 0; r < res[0].BuildingDetails.PropertyDetails.length; r++) {
            setTimeout(() => {
              this.repeatableFields[r] = res[0].BuildingDetails.PropertyDetails[r]

              if (this.repeatableFields[r].Dateofissue == '' ||
              this.repeatableFields[r].Dateofissue == undefined ||
              this.repeatableFields[r].Dateofissue == null) {
              $('#issuedate'+r).val()
            } else {
              this.repeatableFields[r].Dateofissue = this.datePipe.transform(this.repeatableFields[r].Dateofissue, 'dd-MM-yyyy')
              $('#issuedate'+r).val(this.repeatableFields[r].Dateofissue)
            }       
            if (this.repeatableFields[r].ApprovalValidityStartDate == '' ||
            this.repeatableFields[r].ApprovalValidityStartDate == undefined ||
            this.repeatableFields[r].ApprovalValidityStartDate == null) {
            $('#ApprovalValidityDate'+r).val()
          } else {
            this.repeatableFields[r].ApprovalValidityStartDate = this.datePipe.transform(this.repeatableFields[r].ApprovalValidityStartDate, 'dd-MM-yyyy')
            $('#ApprovalValidityDate'+r).val(this.repeatableFields[r].ApprovalValidityStartDate)
          }
          if (this.repeatableFields[r].ApprovalValidityEndDate == '' ||
          this.repeatableFields[r].ApprovalValidityEndDate == undefined ||
          this.repeatableFields[r].ApprovalValidityEndDate == null) {
          $('#ApprovalValidityDate2'+r).val()
        } else {
          this.repeatableFields[r].ApprovalValidityEndDate = this.datePipe.transform(this.repeatableFields[r].ApprovalValidityEndDate, 'dd-MM-yyyy')
          $('#ApprovalValidityDate2'+r).val(this.repeatableFields[r].ApprovalValidityEndDate)
        }
      if (this.repeatableFields[r].ApprovalDate == '' ||
      this.repeatableFields[r].ApprovalDate == undefined ||
      this.repeatableFields[r].ApprovalDate == null) {
      $('#ApprovalDate'+r).val()
    } else {
      this.repeatableFields[r].ApprovalDate = this.datePipe.transform(this.repeatableFields[r].ApprovalDate, 'dd-MM-yyyy')
      $('#ApprovalDate'+r).val(this.repeatableFields[r].ApprovalDate)
    }
    this.minenddate(r);
              for (let tableNum = 0; tableNum < this.repeatableFields[r].dimensionofProperty.length; tableNum++) {
                for (let i = 0; i < this.repeatableFields[r].dimensionofProperty[tableNum].length; i++) {
                  if (this.repeatableFields[r].dimensionofProperty[tableNum][i].Variation != undefined)
                    if (parseFloat(this.repeatableFields[r].dimensionofProperty[tableNum][i].Variation) == 0)
                      $('#variation' + r + tableNum + i).css('background-color', 'green');
                    else if (parseFloat(this.repeatableFields[r].dimensionofProperty[tableNum][i].Variation) < 0)
                      $('#variation' + r + tableNum + i).css('background-color', '#f13131');
                    else
                      $('#variation' + r + tableNum + i).css('background-color', 'transparent')
                  if (!this.constantUOM.includes(this.repeatableFields[r].dimensionofProperty[tableNum][0].UnitAsPerSale)) {
                    $('#convertedSales' + r + tableNum + i).attr('disabled', false)
                  }
                  else {
                    $('#convertedSales' + r + tableNum + i).attr('disabled', true)
                  }
                }
              }
            }, 200)
            this.displayAddBtn(r)
          }
        }
        else {
          this.repeatableFields = []
          if (res[0]?.BuildingDetails?.PropertyDetails != undefined)
            this.repeatableFields = res[0].BuildingDetails.PropertyDetails[0]
          this.addBuilding()
        }
        /*   added for VRR-836 Release 46 -by Saranya  code ended  */
        
        // if (res[0].BuildingDetails.grossAdvanceAmount != '' && res[0].BuildingDetails.grossAdvanceAmount != undefined) {
        //   if (parseFloat(res[0].BuildingDetails.grossAdvanceAmount) > 999) {
        //     this.buildingdetails.controls['grossAdvanceAmount'].setValue(parseFloat(res[0].BuildingDetails.grossAdvanceAmount).toFixed(2).replace(/(\d)(?=(\d{2})+\d\.)/g, '$1,'))
        //   }
        //   else {
        //     this.buildingdetails.controls['grossAdvanceAmount'].setValue(parseFloat(res[0].BuildingDetails.grossAdvanceAmount).toFixed(2))
        //   }
        // }
        // if (res[0].BuildingDetails.grossMonthrent != '') {
        //   if (res[0].BuildingDetails.grossMonthrent != undefined && parseFloat(res[0].BuildingDetails.grossMonthrent) > 999) {
        //     this.buildingdetails.controls['grossMonthrent'].setValue(parseFloat(res[0].BuildingDetails.grossMonthrent).toFixed(2).replace(/(\d)(?=(\d{2})+\d\.)/g, '$1,'))
        //   }
        //   else {
        //     this.buildingdetails.controls['grossMonthrent'].setValue(parseFloat(res[0].BuildingDetails.grossMonthrent).toFixed(2))
        //   }
        // }

        this.buildingdetails.controls['occupied'].setValue(res[0].BuildingDetails.occupied)
        this.buildingdetails.controls['occupiedbyTenant'].setValue(res[0].BuildingDetails.occupiedbyTenant)
        this.buildingdetails.controls['currentTenant'].setValue(res[0].BuildingDetails.currentTenant)
        //if radio button selected value is 'Bad' -it disable the text area
        this.Buildingdetails.controls['cunstruction'].setValue(res[0].BuildingDetails.cunstruction)
        this.Buildingdetails.controls['cunstructiontxt'].setValue(res[0].BuildingDetails.cunstructiontxt);

        //if radio button selected value is 'No' -its hide the proof field.
        this.buildingdetails.controls['Proof'].setValue(res[0].BuildingDetails.Proof)
        if (res[0].BuildingDetails.Proof == 'Yes') {
        } else {
          $('#Prooftxt').css('display', 'none');
        }
        this.buildingdetails.controls['liveableCondition'].setValue(res[0].BuildingDetails.liveableCondition)
        this.Buildingdetails.controls['unitAsPerDeed'].setValue(res[0].BuildingDetails.unitAsPerDeed)
        this.Buildingdetails.controls['unitActual'].setValue(res[0].BuildingDetails.unitActual)
        // this.Buildingdetails.controls['buildingInsured'].setValue(res[0].BuildingDetails.buildingInsured)
        //if radio button selected value is 'No' -its hide the text Area field.
        if (res[0].BuildingDetails.buildingInsured == 'No') {
          $('#buildingInsuredtxt').hide(); //css('display', 'none');
          $('#buildingInsuredtxt').val('')
        }
        this.Buildingdetails.controls['insuredvalue'].setValue(res[0].BuildingDetails.insuredvalue)
        this.Buildingdetails.controls['typeofConstruction'].setValue(res[0].BuildingDetails.typeofConstruction)
        if (res[0].BuildingDetails?.typeofConstruction == 'Others') {
          this.otherConstruction = true;
          this.Buildingdetails.controls['typeofConstructionTxt'].setValue(res[0].BuildingDetails.typeofConstructionTxt)
        }

        this.Buildingdetails.controls['building'].setValue(res[0].BuildingDetails.building)
        this.Buildingdetails.controls['quality'].setValue(res[0].BuildingDetails.quality)
        this.Buildingdetails.controls['buildingInterior'].setValue(res[0].BuildingDetails.buildingInterior)
        this.Buildingdetails.controls['buildingExterior'].setValue(res[0].BuildingDetails.buildingExterior)
        this.Buildingdetails.controls['compound'].setValue(res[0].BuildingDetails.compound)
        //fix for VRR-787  
        this.buildingdetails.controls['validityLayout'].setValue(res[0].BuildingDetails.ValidityOfLayout)
        this.buildingdetails.controls['approvedAuthority'].setValue(res[0].BuildingDetails.ApprovedAuthority)
        this.buildingdetails.controls['approvingAuthorities'].setValue(res[0].BuildingDetails.AdditionalApprovingAuthorities)
        this.buildingdetails.controls['completionCertificate'].setValue(res[0].BuildingDetails.CompletionCertificateNumber);
        this.buildingdetails.controls['additionalNotesAppro'].setValue(res[0].BuildingDetails.AdditionalNotesAppro);
        this.buildingdetails.controls['projectApproved'].setValue(res[0].BuildingDetails.ProjectApproved);
        this.buildingdetails.controls['approvAuthority'].setValue(res[0].BuildingDetails.ApprovAuthority);
        this.buildingdetails.controls['approvalNo'].setValue(res[0].BuildingDetails.ApprovalNo);

        //check the value not an empty and undefined
        if (res[0].BuildingDetails.ApprovalValidityEndDate != '' || res[0].BuildingDetails.ApprovalValidityEndDate != undefined) {
          // Set the value of ApprovalValidityEndDate based on the transformed date value
          this.ApprovalValidityEndDate = this.datePipe.transform(res[0].BuildingDetails.ApprovalValidityEndDate, 'dd-MM-yyyy')
        }
        // if (res[0].BuildingDetails.ApprovalDate == '' ||
        //   res[0].BuildingDetails.ApprovalDate == undefined ||
        //   res[0].BuildingDetails.ApprovalDate == null) {
        //   $('#ApprovalDate').val()
        // } else {
        //   this.ApprovalDate = this.datePipe.transform(res[0].BuildingDetails.ApprovalDate, 'dd-MM-yyyy')
        //   $('#ApprovalDate').val(this.ApprovalDate)
        // }
        if (res[0].BuildingDetails.ApprovalValidityDate == '' ||
          res[0].BuildingDetails.ApprovalValidityDate == undefined ||
          res[0].BuildingDetails.ApprovalValidityDate == null) {
          $('#ApprovalValidityDate').val()
        } else {
          this.approvalValidityStartDate = this.datePipe.transform(res[0].BuildingDetails.ApprovalValidityDate, 'dd-MM-yyyy')
        }
     
        //fix for VRR-787
        this.dynamicArray = res[0].BuildingDetails.dynamicarray
        this.contactArray = res[0].BuildingDetails.contactarray
        res[0].BuildingDetails.dynamicarray.forEach(element => {
          Object.freeze(this.checkFloorNum.push(element.floor))
        });
        //  Code added for Release 46 added by saranya
        setTimeout(() => {
          let btn = document.querySelectorAll('.addbuilding');
          $(document.querySelectorAll('.addbuilding')).show()
          if (btn.length != 1)
            for (var i = 0; i < btn.length - 1; i++) {
              if (i == btn.length - 1) {
                $(document.querySelectorAll('.addbuilding')[i]).show()
              }
              else
                $(document.querySelectorAll('.addbuilding')[i]).hide()
            }
        }, 100);

        if (res[0].ValuationGeneralStatus == "Completed") {
          for (var i = 0; i < this.dynamicArray.length; i++) {
            this.ValuationFloor.push(res[0].ValuationGeneral.dynamicArray[i].floor)
          }
        }
      }
      /* added by Saranya for collapse panel UI-- Started */
      if (sessionStorage.getItem('Appraisalstatus') == 'Lender Request Correction') { //added for checking Lender Request Correction
        setTimeout(() => {
          $('.deletebtn').attr('disabled', true)
          $('#createNewBuilding').hide();
        }, 300)
      }
      /* added by Saranya for collapse panel UI-- Ended */

      if (this.Appraisalstatus == 'Approved' || this.Appraisalstatus == 'Rejected') {

        setTimeout(() => {
          // disable the fields based on the class Name by Franklin.
          let uploadBtn = document.querySelectorAll(`.btn-close,.deletebtn, .upload_btn, .save-btn, .form-button, 
          .form-control, input[type="radio"], .form-select, .table-input`) as NodeListOf<HTMLInputElement>;
          // Loop through each element in the uploadBtn NodeList
          for (let i = 0; i < uploadBtn.length; i++) {
            let inputElement = uploadBtn[i]
            // Set the cursor style to "not-allowed"
            inputElement.style.cursor = 'not-allowed';
            // Disable the input element
            inputElement.disabled = true;
          }
          const submitButton = document.getElementById('savebtn');
          submitButton.classList.remove('save-btn');
          submitButton.classList.add('save-btn_');
        }, 0);

        this.dynamicArrayd = true
        this.contactArrayc = true
        this.addbtnd = true
        $('#createNewBuilding').hide();

        $('.boundryofPropery').attr("disabled", "disabled")
        $('.boundryofPropery').css('cursor', 'not-allowed');
        setTimeout(() => {
          for (let row = 0; row <= res[0].BuildingDetails.BoundariesOfProperty.length; row++) {
            for (let i = 0; i < 4; i++) {
              $('#PropertyAsPerDeed' + row + i).attr("disabled", "disabled");
              $('#PropertyAsPerDeed' + row + i).css('cursor', 'not-allowed');
              $('#PropertyActual' + row + i).attr("disabled", "disabled");
              $('#PropertyActual' + row + i).css('cursor', 'not-allowed');
              $('#DimensionAsPerDeed' + row + i).attr("disabled", "disabled");
              $('#DimensionAsPerDeed' + row + i).css('cursor', 'not-allowed');
              $('#DimensionActual' + row + i).attr("disabled", "disabled");
              $('#DimensionActual' + row + i).css('cursor', 'not-allowed');
            }
          }
        }, 300)
        // }
        $('#ProofForIdentification').attr('disabled', true)
      }
    });

  }

  formatDate(date) {
    date = date.split('-');
    return date[2].slice(0, 2) + '-' + date[1] + '-' + date[0]
  }

  /*   added for VRR-836 Release 46 -by Saranya  [r] added for repeatable field Code started */
  PlinthAreaCal(elem: any, index: any, r) {
    var ContactObserved = $(document.querySelectorAll('#contactobserved' + r)[index]).val();
    var ContactDeed = $(document.querySelectorAll('#contactdeed' + r)[index]).val();
    var ContactCompleted = 0;
    var Plinthtol1 = 0;
    var Plinthtol2 = 0;
    if (ContactObserved == "" || ContactDeed == "") {
      $(document.querySelectorAll('#contactcompleted'+ r)[index]).val('');
      this.repeatableFields[r]['contactArray'][index].plinthAreaTotal = '';
      this.plinthAreaTotal(r)
      return false;
    }
    else {
      Plinthtol1 = parseInt(ContactDeed);
      Plinthtol2 = parseInt(ContactObserved);
      Plinthtol2 += Plinthtol1 / 2;
      ContactCompleted = Plinthtol2;
    }
    if (elem == "Plinthval") {
      $(document.querySelectorAll('#contactcompleted'+ r)[index]).val(ContactCompleted) || 0;
      this.repeatableFields[r]['contactArray'][index].plinthAreaTotal = ContactCompleted.toString();
      this.plinthAreaTotal(r)
    }
  }

  plinthAreaTotal(r:any){
    // calculate PlinthArea Total value 
    this.TotalPlinthArea=0
    this.repeatableFields[r].plinthArea_Total_Main = null
    this.repeatableFields[r]['contactArray'].map((x)=>{
      this.repeatableFields[r].plinthArea_Total_Main += (parseFloat(x.plinthAreaTotal) || 0)
    })
    for(var i=0;i<this.repeatableFields.length;i++){
    if(this.repeatableFields[i].plinthArea_Total_Main==null||this.repeatableFields[i].plinthArea_Total_Main==undefined||this.repeatableFields[i].plinthArea_Total_Main=='')
    this.TotalPlinthArea +=0
  else
    this.TotalPlinthArea += this.removeCurrencyFormat(this.repeatableFields[i].plinthArea_Total_Main)
  }
  var PinthArea= this.TotalPlinthArea
 // this.TotalPlinthArea this.checkcurrency(this.TotalPlinthArea)
 PinthArea = PinthArea.toString().replaceAll(',', '');
  // Check if the parsed dimension value is greater than 999
  if (parseFloat(PinthArea) > 999) {
    // Format the dimension with 2 decimal places and add commas for thousands separator
    this.TotalPlinthArea = parseFloat(PinthArea).toFixed(2).replace(/(\d)(?=(\d{2})+\d\.)/g, '$1,');
  } else {
    // Check if the dimension is a valid number
    if (!isNaN(PinthArea))
    this.TotalPlinthArea = parseFloat(PinthArea).toFixed(2);
  }
    if(this.repeatableFields[r].plinthArea_Total_Main == 0){
      this.repeatableFields[r].plinthArea_Total_Main = ''
    }
  }

  /*   added for VRR-836 Release 46 -by Saranya   Code ended */
  getusername(borrowerid) {
    var obj = {
      UserID: borrowerid
    }
    this.AppService.GetUserData(obj).subscribe(res => {
      this.BorrowerID = res[0].UserName
    });
  }
  getaddress(propertyid) {
    const obj1 = {
      'PropertyID': propertyid
    }
    this.AppService.GetLocationDetails(obj1).subscribe(res_ => {
      this.PropertyID1 = res_[0].Address.AddArea + ', ' + res_[0].Address.City;
      this.Address = res_[0].Address.StreetName + ', ' + res_[0].Address.AddArea + ', ' + res_[0].Address.City
    });
  }

  /*   added for VRR-836 Release 46 -by Saranya   Code started */
  // change the value into currency
  checkcurrency(id,event:any, r, curr) { // by Franklin - release 46
    // Retrieve the amount from the specified repeatable field
    var amount = event.target.value;
    // Check if the amount is not empty
    if (amount != '') {
      // Remove any commas from the amount and convert it to a string
      amount = amount.toString().replaceAll(',', '');
      // Check if the parsed amount is greater than 999
      if (parseFloat(amount) > 999) {
        // Format the amount with two decimal places and add commas for thousands separator
        event.target.value = parseFloat(amount).toFixed(2).replace(/(\d)(?=(\d{2})+\d\.)/g, '$1,');
        curr.repeatableFields[r][id] = parseFloat(amount).toFixed(2).replace(/(\d)(?=(\d{2})+\d\.)/g, '$1,');
      } else {
        // Check if the amount is a valid number
        if (!isNaN(amount)) {
          // Format the amount with two decimal places
          event.target.value = parseFloat(amount).toFixed(2);
          curr.repeatableFields[r][id] = parseFloat(amount).toFixed(2);
        }
      }
    }
  }

  //Radio button Textbox, pdfFile Validation like (disable, Enable, hide or show)..
  ShowHideInsured(index, id, r, curr) { //... by franklin -ralease 46
    // Retrieve the value of the element that triggered the event (assuming it's an input field)
    let check = $('#' + index.currentTarget.id).val();
    switch (check) {
      case 'Yes':
        // Code to show the element with the ID specified by id + r
        // $('#' + id + r).show();
        break;
      case 'No':
        // Check if the IDs match a specific condition ('dynamicFile2'+ r == id+r)
        if ('dynamicFile2' + r == id + r) {
          // If the condition is true, assign an empty array to curr.repeatableFields[r][id]
          curr.repeatableFields[r][id] = [];
        } else {
          // If the condition is false, assign an empty string to curr.repeatableFields[r][id]
          curr.repeatableFields[r][id] = '';
        }
        break;
      default:
        console.log('defautValue - ', index.currentTarget.name);
        break;
    }
  }


  addTable(rows: any, r) {
    this.repeatableFields[r].rows.push(this.repeatableFields[r].rows)
    let Dimension = [
      {
        Direction: 'North',
        DimensionAsPerActual: '',
        UnitAsPerActual: '',
        DimensionAsPerDeed: '',
        UnitAsPerSale: '',
        ConvertedSales: '',
        ConvertedUnit: '',
        Variation: '',
        VariationUnit: '',
        Remarks: '',
      }, {
        Direction: 'South',
        DimensionAsPerActual: '',
        UnitAsPerActual: '',
        DimensionAsPerDeed: '',
        UnitAsPerSale: '',
        ConvertedSales: '',
        ConvertedUnit: '',
        Variation: '',
        VariationUnit: '',
        Remarks: '',
      }, {
        Direction: 'East',
        DimensionAsPerActual: '',
        UnitAsPerActual: '',
        DimensionAsPerDeed: '',
        UnitAsPerSale: '',
        ConvertedSales: '',
        ConvertedUnit: '',
        Variation: '',
        VariationUnit: '',
        Remarks: '',
      }, {
        Direction: 'West',
        DimensionAsPerActual: '',
        UnitAsPerActual: '',
        DimensionAsPerDeed: '',
        UnitAsPerSale: '',
        ConvertedSales: '',
        ConvertedUnit: '',
        Variation: '',
        VariationUnit: '',
        Remarks: '',
      },
      {
        Direction: 'Extent',
        DimensionAsPerActual: '',
        UnitAsPerActual: '',
        DimensionAsPerDeed: '',
        UnitAsPerSale: '',
        ConvertedSales: '',
        ConvertedUnit: '',
        Variation: '',
        VariationUnit: '',
        Remarks: '',
      }
    ]
    this.repeatableFields[r].dimensionofProperty[rows + 1] = Dimension;
    setTimeout(() => {
      let btn = document.querySelectorAll('.add-row-icon');
      $(document.querySelectorAll('.add-row-icon')).show()
      if (btn.length != 1)
        for (var i = 0; i < btn.length - 3; i++) {
          if (i == btn.length - 3) {
            $(document.querySelectorAll('.add-row-icon')[i]).show()
          }
          else
            $(document.querySelectorAll('.add-row-icon')[i]).hide()
        }
    }, 100);
  }
  addPolygonTable(tableindex) {
  }

  // Code added for Release 44.1
  removeAddBtn(flag) {
    var btn;
    btn = document.querySelectorAll('.add-row-icon');
    $(document.querySelectorAll('.add-row-icon')).show()
    if (flag == 1) {
      if (btn.length != 1)
        for (var i = 0; i < btn.length - 2; i++) {
          if (i == btn.length - 2) {
            $(document.querySelectorAll('.add-row-icon')[i]).show()
          }
          else
            $(document.querySelectorAll('.add-row-icon')[i]).hide()
        }
    }
    if (flag == 2) {
      for (var i = 0; i < btn.length - 2; i++) {
        $(document.querySelectorAll('.add-row-icon')[i]).hide()
      }
    }
  }

  deleteBuildingRow(x: number, r) {
    if (this.row_.length == 1) {
      this.dimensionofProperty = [];
    }
    this.row_.splice(x, 1);
    this.dimensionofProperty.splice(x, 1);
    setTimeout(() => {
      let btn = document.querySelectorAll('.add-row-icon');
      $(document.querySelectorAll('.add-row-icon')).show()
      for (var i = 0; i < btn.length - 3; i++) {
        $(document.querySelectorAll('.add-row-icon')[i]).hide()
      }
    }, 200);
  }

  //This is an asynchronous function that takes two arguments: an event object and a flag value. by franklin
  async fileuploadName1(event: any, flag, r) {
    //A variable to hold the image URL and image to show.
    let imageUrl: any;
    let imagetoshow: any;
    // An array to hold the uploaded files.
    let files: Array<File> = event.target.files;
    let tempArr = [...files]
    tempArr.map(val => {
      if (val.type == 'image/jpeg' || val.type == 'image/jpg' || val.type == 'application/pdf') {
        //allow (300 KB == 307200) for other files
        if (val.size > 307200) {
          Swal.fire("", 'Uploaded File should not exceed 300 KB', "info");
          event.target.value = ''
          return false;
        }
      } else {
        // if file type not an jpeg, pdf the else part will Execute.
        Swal.fire("", 'Uploaded Image should be in JPG, JPEG, or PDF format', "warning");
        event.target.value = '';
        return false;
      }
    })
    //An array to hold the Promises for each file.
    const promises: Promise<any>[] = []
    //Loop through each file.
    for (let i = 0; i < files.length; i++) {
      //An object to hold information about the file
      const fileObj: any = {};
      //A FileReader object to read the file as a data URL.
      let reader = new FileReader();
      //Read the file as a data URL.
      reader.readAsDataURL(files[i]);
      const promise = new Promise((resolve, reject) => {
        //When the file has loaded as a data URL
        reader.onload = (e: any) => {
          //Extract the file extension
          this.fileExt = files[i]['name'].split('.').pop();
          //Add the extension to the file object.
          fileObj['extension'] = this.fileExt;
          // Create an Image object
          let image = new Image();
          // Set the source of the Image object to the data URL.
          image.src = reader.result as string;
          let user_image = event.target.files as Array<File>;
          imagetoshow = user_image[i].name;
          imageUrl = reader.result as string;
          fileObj['base64'] = imageUrl;
          fileObj['fileName'] = files[i]['name'];
          fileObj['flag'] = 1;
          // Depending on the value of flag...
          switch (flag) {
            case 1:
              if (this.repeatableFields[r]['dynamicFile1'] != undefined) {
                if (this.repeatableFields[r]['dynamicFile1'].length != 0) {
                  this.repeatableFields[r]['dynamicFile1'].map((val, index) => {
                    if (fileObj['fileName'] == val.fileName) {
                      // Remove the existing file object from the array. 
                      this.repeatableFields[r]['dynamicFile1'].splice(index, 1);
                    }
                  });
                }
              }
              // Add the new file object to the array.
              this.repeatableFields[r]['dynamicFile1'].push(fileObj);
              // Resolve the Promise with "success".
              return resolve('success')
              break;
            case 2:
              if (this.repeatableFields[r]['dynamicFile2'] != undefined) {
                if (this.repeatableFields[r]['dynamicFile2'].length != 0) {
                  this.repeatableFields[r]['dynamicFile2'].map((val, index) => {
                    if (fileObj['fileName'] == val.fileName) {
                      // Remove the existing file object from the array.
                      this.repeatableFields[r]['dynamicFile2'].splice(index, 1);
                    }
                  });
                }
              }
              // Add the new file object to the array.
              this.repeatableFields[r]['dynamicFile2'].push(fileObj);
              if (this.repeatableFields[r]['dynamicFile2'].length != 0)
                // Resolve the Promise with "success".
                return resolve('success')
              break;
            default:
              console.log('default upload value ');
              break;
          }

        };
        reader.onerror = (error) => {
          reject(error);
        };
      });
      // Push the Promise to the array of Promises.
      promises.push(promise);
    }
    // Wait for all the Promises to resolve.
    await Promise.all(promises).then(res => {
      event.target.value = '';
    })
  }

  /*   added for VRR-836 Release 46 -by Saranya   Code started */

  // function used to view the file when click file
  View1(index, flag, r) {
    let imageURL = '';
    // get the flag value as an argument
    switch (flag) {
      case 1:
        //get the Image Url based on selected Index.
        imageURL = this.repeatableFields[r]['dynamicFile1'][index].base64
        break;
      case 2:
        //get the Image Url based on selected Index.
        imageURL = this.repeatableFields[r]['dynamicFile2'][index].base64
        break;
      default:
        console.log('default open value ');
        break;
    }
    //open new window
    let pdfWindow = window.open("")
    //write the imageURL data to the window
    pdfWindow.document.write(
      "<iframe width='100%' height='100%' src=" + imageURL + " ></iframe>")
  }

  //function used to remove the slected file
  closeUpload11(index, flag, r) {
    // get the flag value as an argument
    switch (flag) {
      case 1:
        //remove the value based on index
        this.repeatableFields[r]['dynamicFile1'].splice(index, 1);
        break;
      case 2:
        //remove the value based on index
        this.repeatableFields[r]['dynamicFile2'].splice(index, 1);
        break;
      default:
        console.log('default remove value ');
        break;
    }
  }

  // this function is call when the value is selected in the dropdown
  checkOptionVal(eve, r) {
    //If selected value is 'Others', it's show the remark field.otherwise execute else part
    if (eve.target.value == 'Others') {
      this.otherConstruction = true;
    } else {
      // empty the remark field value and hide the remark fields.
      this.repeatableFields[r].TypeofConstructionRemarks = '';
      this.otherConstruction = false;
    }
  }

  appendValue(event, tableNum, index, flag, r) {
    let UnitAsPerSale = event.target.value;
    if (flag == 1) {
      for (let i = 0; i <= this.repeatableFields[r].dimensionofProperty[tableNum].length-1; i++) {
        this.repeatableFields[r].dimensionofProperty[tableNum][i].UnitAsPerSale = UnitAsPerSale
      }
      let index=this.repeatableFields[r].dimensionofProperty[tableNum].length-1
      if(UnitAsPerSale=="R.ft") //VRR-926 issue fix
      this.repeatableFields[r].dimensionofProperty[tableNum][index].UnitAsPerSale='Sq.ft'
  else if(UnitAsPerSale=="R.M")
  this.repeatableFields[r].dimensionofProperty[tableNum][index].UnitAsPerSale='Sq.m'
  else
  this.repeatableFields[r].dimensionofProperty[tableNum][index].UnitAsPerSale=UnitAsPerSale
    }
    else {
      for (let i = 0; i < this.rowforPolygon[tableNum].length; i++) {
        this.rowforPolygon[tableNum][i].UnitAsPerSale = UnitAsPerSale
      }
    }
  }

  UnitAsPerSaleValue(event, tableNum, index, flag, r) {
    let unitValuesq;
    let unitValuefeet;
    let UOMOfUser
    if (flag == 3) {
      UOMOfUser = this.repeatableFields[r].dimensionofProperty[tableNum][index].UOM
    }
    if (this.repeatableFields[r].dimensionofProperty[tableNum][index].UnitAsPerSale == undefined || this.repeatableFields[r].dimensionofProperty[tableNum][index].UnitAsPerSale == "") {
      this.repeatableFields[r].dimensionofProperty[tableNum][index].DimensionAsPerDeed = ''
      Swal.fire(" ", "Please select UOM of As per Sale Deed", "info")
      return;
    }
    let UnitAsPerSale = this.repeatableFields[r].dimensionofProperty[tableNum][index].UnitAsPerSale

    if (UnitAsPerSale == "Hectare") {
      unitValuesq = 10000
      unitValuefeet = 107639
    }
    else if (UnitAsPerSale == "Acre") {
      unitValuesq = 4046.86
      unitValuefeet = 43560
    }
    else if (UnitAsPerSale == "Are") {
      unitValuesq = 100
      unitValuefeet = 1076.39
    }
    else if (UnitAsPerSale == "Ground") {
      unitValuesq = 222.96
      unitValuefeet = 2400
    } else if (UnitAsPerSale == "Cent") {
      unitValuesq = 40.46
      unitValuefeet = 435.56

    } else if (UnitAsPerSale == "R.ft") {
      if(this.repeatableFields[r].dimensionofProperty[tableNum][index].UnitAsPerActual != "R.ft")
      unitValuefeet = 3.280839895
      else
      unitValuefeet = 1
      unitValuesq = 0.3048
    } else if (UnitAsPerSale == "R.M") {
      if(this.repeatableFields[r].dimensionofProperty[tableNum][index].UnitAsPerActual != "R.M")
      {
        unitValuefeet=3.280839895 //VRR-1024
        unitValuesq=1
      }
      else
      unitValuefeet = 1
      unitValuesq=3.280839895
    }
    else if (UnitAsPerSale == "Others") {
      if (this.repeatableFields[r].dimensionofProperty[tableNum][index].UnitAsPerActual != "R.ft" &&
        this.repeatableFields[r].dimensionofProperty[tableNum][index].UnitAsPerActual != "R.M") {
        Swal.fire(" ", "Please select UOM of As per Actuals", "info")
        for (let i = 0; i <= 4; i++) {
          this.repeatableFields[r].dimensionofProperty[tableNum][i].UnitAsPerSale = ""
        }
        return;
      }
      this.Reset(tableNum, index, r);
      this.repeatableFields[r].dimensionofProperty[tableNum][index].UOM = '';
      if (flag != 3) {
        this.create_form = false;
        this.sucess_wrapper = true;
        if (window.innerWidth < 768) {
          $('#createModal' + r).removeClass('show').addClass('hiding');
          setTimeout(() => $('#createModal' + r).removeClass('hiding'), $('body').removeClass('modal-open'), $('#createModal' + r).modal('hide'), 250);
          this.sucess_wrapper = false;
        } else {
          $('#createModal' + r).modal('show');
          this.create_form = true;
          this.sucess_wrapper = false;
        }
      }
    } else {
      if (flag == 2) {
        for (let j = 0; j <= 4; j++) {
          for (let i = 0; i <= 4; i++) {
            $('#convertedSales' + r + j + i).attr('disabled', false)
            if (this.repeatableFields[r].dimensionofProperty[j] != undefined)
              this.repeatableFields[r].dimensionofProperty[j][i].UnitAsPerSale = this.repeatableFields[r].dimensionofProperty[tableNum][0].UnitAsPerSale
          }
        }
      } else if (flag == 0) {
        for (let j = 0; j <= 4; j++) {
          for (let i = 0; i <= 4; i++) {
            $('#convertedSales' + r + j + i).attr('disabled', false)
            if (this.repeatableFields[r].dimensionofProperty[j] != undefined) {
              this.repeatableFields[r].dimensionofProperty[j][i].ConvertedSales = ""
              this.repeatableFields[r].dimensionofProperty[j][i].DimensionAsPerDeed = ""
              this.repeatableFields[r].dimensionofProperty[j][i].Variation = ""
              this.repeatableFields[r].dimensionofProperty[j][i].UnitAsPerSale = this.repeatableFields[r].dimensionofProperty[tableNum][0].UnitAsPerSale
            }
            $('#variation' + r + j + i).css('background-color', 'transparent')
          }
        }
      }
    }
    if (!this.constantUOM.includes(this.repeatableFields[r].dimensionofProperty[tableNum][index].UnitAsPerSale)) {
      for (let j = 0; j <= 4; j++) {
        for (let i = 0; i <= 4; i++) {
          $('#convertedSales' + r + j + i).attr('disabled', false)
        }
      }
      this.variationCalc(tableNum, index, 1, r)
      // if(UOMOfUser!=''&& UOMOfUser!=undefined && UOMOfUser!=null )
      // {
      //   this.closeForm();
      //  this.UOM.push(UOMOfUser) 
      //  for(let j=0;j<=4;j++)
      //  {
      //  for(let i=0;i<=4;i++)
      //  {
      //   $('#convertedSales'+j+i).attr('disabled',false)
      //   this.repeatableFields[r].dimensionofProperty[j][i].ConvertedSales=""
      //   this.repeatableFields[r].dimensionofProperty[j][i].DimensionAsPerDeed=""
      //   this.repeatableFields[r].dimensionofProperty[j][i].Variation=""
      //   this.repeatableFields[r].dimensionofProperty[j][i].UnitAsPerSale=UOMOfUser
      //  }
      // }
      // }
    } else {
      for (let j = 0; j <= 4; j++) {
        for (let i = 0; i <= 4; i++) {
          $('#convertedSales' + r + j + i).attr('disabled', true)
        }
      }
      if (this.repeatableFields[r].dimensionofProperty[tableNum][index].UnitAsPerActual == "R.M") {
        for (let i = 0; i < 4; i++) { //modified for UOM VRR-936
          if (this.repeatableFields[r].dimensionofProperty[tableNum][i].DimensionAsPerDeed != '' && this.repeatableFields[r].dimensionofProperty[tableNum][i].UnitAsPerSale != '') {
            let tempValue = 0
            let salesValue = ''
            if(this.repeatableFields[r].dimensionofProperty[tableNum][index].UnitAsPerSale=="R.M")
            tempValue=parseFloat(this.removeCurrencyFormat(this.repeatableFields[r].dimensionofProperty[tableNum][i].DimensionAsPerDeed))
            else 
            tempValue=parseFloat(this.removeCurrencyFormat(this.repeatableFields[r].dimensionofProperty[tableNum][i].DimensionAsPerDeed))/3.2808399
    
            salesValue = tempValue.toString()
            if (parseFloat(salesValue) > 999)
              this.repeatableFields[r].dimensionofProperty[tableNum][i].ConvertedSales = parseFloat(salesValue).toFixed(2).replace(/(\d)(?=(\d{2})+\d\.)/g, '$1,')
            else {
              if (!isNaN(parseFloat(salesValue)))
                this.repeatableFields[r].dimensionofProperty[tableNum][i].ConvertedSales = parseFloat(salesValue).toFixed(2)
            }
            this.DimensionAsPerDeedCalc(tableNum,i,r)//added by saranya
          } else
            this.repeatableFields[r].dimensionofProperty[tableNum][i].ConvertedSales = ''
        }
        this.variationCalc(tableNum, index, 1, r)
      } else if (this.repeatableFields[r].dimensionofProperty[tableNum][index].UnitAsPerActual == "R.ft") {
        for (let i = 0; i <4; i++) { //modified for UOM VRR-936
          if (this.repeatableFields[r].dimensionofProperty[tableNum][i].DimensionAsPerDeed != '' && this.repeatableFields[r].dimensionofProperty[tableNum][i].UnitAsPerSale != '') {
            let tempValue = 0
            let salesValue = ''
            if(this.repeatableFields[r].dimensionofProperty[tableNum][index].UnitAsPerSale=="R.ft")
            tempValue=parseFloat(this.removeCurrencyFormat(this.repeatableFields[r].dimensionofProperty[tableNum][i].DimensionAsPerDeed))
           else
            tempValue=3.2808399*parseFloat(this.removeCurrencyFormat(this.repeatableFields[r].dimensionofProperty[tableNum][i].DimensionAsPerDeed))
   
            salesValue = tempValue.toString()
            if (parseFloat(salesValue) > 999)
              this.repeatableFields[r].dimensionofProperty[tableNum][i].ConvertedSales = parseFloat(salesValue).toFixed(2).replace(/(\d)(?=(\d{2})+\d\.)/g, '$1,')
            else {
              if (!isNaN(parseFloat(salesValue)))
                this.repeatableFields[r].dimensionofProperty[tableNum][i].ConvertedSales = parseFloat(salesValue).toFixed(2)
            }
            this.DimensionAsPerDeedCalc(tableNum,i,r)//added by saranya
          } else
            this.repeatableFields[r].dimensionofProperty[tableNum][i].ConvertedSales = ''
        }
        this.variationCalc(tableNum, index, 1, r)
      } else {
        Swal.fire(" ", "Please select UOM of As per Actuals", "info")
        return
      }
    }
  }

  UnitAsPerActual(event, tableNum, index, flag, r) {
    // Declare variables
    let unitforActual;
    let unitforExtent;
    let unitValuefeet = 3.280839895;
    let unitValuesq = 0.3048;
    // Get the unit for actual from the event target value
    unitforActual = event.target.value;
    // Check the flag value
    if (flag == 1) {
      // Loop through the dimensionofProperty array and update unit values
      for (let i = 0; i <= this.repeatableFields[r].dimensionofProperty[tableNum].length - 1; i++) {
        this.repeatableFields[r].dimensionofProperty[tableNum][i].UnitAsPerActual = unitforActual;
        this.repeatableFields[r].dimensionofProperty[tableNum][i].ConvertedUnit = unitforActual;
        this.repeatableFields[r].dimensionofProperty[tableNum][i].VariationUnit = unitforActual;
      }
  
      // Determine the unit for extent based on the unit for actual
      if (unitforActual == "R.ft")
        unitforExtent = 'Sq.ft';
      else
        unitforExtent = 'Sq.m';
      // Get the index for the last element in dimensionofProperty array
      let lastIndex = this.repeatableFields[r].dimensionofProperty[tableNum].length - 1;
      // Update unit values for the last element in dimensionofProperty array
      this.repeatableFields[r].dimensionofProperty[tableNum][lastIndex].UnitAsPerActual = unitforExtent;
      this.repeatableFields[r].dimensionofProperty[tableNum][lastIndex].ConvertedUnit = unitforExtent;
      this.repeatableFields[r].dimensionofProperty[tableNum][lastIndex].VariationUnit = unitforExtent;
    } else {
      // Loop through the rowforPolygon array and update unit values
      for (let i = 0; i < this.rowforPolygon[tableNum].length; i++) {
        this.rowforPolygon[tableNum][i].UnitAsPerActual = unitforActual;
        this.rowforPolygon[tableNum][i].ConvertedUnit = unitforActual;
        this.rowforPolygon[tableNum][i].VariationUnit = unitforActual;
      }
    }
    this.UnitAsPerSaleValue(event, tableNum, index, flag, r)
  }  

  saveUOM(r, tableNum, index) {
    // Get the UOM entered by the user
    let UOMOfUser = this.repeatableFields[r].dimensionofProperty[tableNum][index].UOM;
    // Check if UOMOfUser is not empty, undefined, or null
    if (UOMOfUser != '' && UOMOfUser != undefined && UOMOfUser != null) {
      // Close the form
      this.closeForm(r);
      
      // Push UOMOfUser to the UOM array
      this.UOM.push(UOMOfUser);
      this.UOMaddedbyUser.push(UOMOfUser);
  
      // Enable convertedSales input fields and reset related values
      for (let j = 0; j <= 4; j++) {
        for (let i = 0; i <= 4; i++) {
          $('#convertedSales' + r + j + i).attr('disabled', false);
  
          if (this.repeatableFields[r].dimensionofProperty[j] != undefined) {
            this.repeatableFields[r].dimensionofProperty[j][i].ConvertedSales = "";
            this.repeatableFields[r].dimensionofProperty[j][i].DimensionAsPerDeed = "";
            this.repeatableFields[r].dimensionofProperty[j][i].Variation = "";
            this.repeatableFields[r].dimensionofProperty[j][i].UnitAsPerSale = UOMOfUser;
          }
        }
      }
    } else {
      // Show an info message if UOM is not entered
      Swal.fire("", 'Please enter the Unit of Measurement', "info");
    }
  }
  

   //function to calculate extent(As per Sales deed)
   DimensionAsPerDeedCalc(tableNum,index,r)
   {
    // 1 square meter = 10.7639 square feet
  //  if(index==0||index==2)//added by saranya
    // {
     if( this.repeatableFields[r].dimensionofProperty[tableNum][0].DimensionAsPerDeed==''||  
      this.repeatableFields[r].dimensionofProperty[tableNum][1].DimensionAsPerDeed==''||
      this.repeatableFields[r].dimensionofProperty[tableNum][2].DimensionAsPerDeed==''||
      this.repeatableFields[r].dimensionofProperty[tableNum][3].DimensionAsPerDeed=='')       {
         this.repeatableFields[r].dimensionofProperty[tableNum][4].DimensionAsPerDeed=''
       }
       else{
       let extendValue;
       let convertedSalesExtend;
       extendValue=((parseFloat( this.repeatableFields[r].dimensionofProperty[tableNum][0].DimensionAsPerDeed.replace(',',''))+parseFloat(this.repeatableFields[r].dimensionofProperty[tableNum][1].DimensionAsPerDeed.replace(',','')))/2)*
       ((parseFloat( this.repeatableFields[r].dimensionofProperty[tableNum][2].DimensionAsPerDeed.replace(',',''))+parseFloat(this.repeatableFields[r].dimensionofProperty[tableNum][3].DimensionAsPerDeed.replace(',','')))/2)
       convertedSalesExtend=((parseFloat( this.repeatableFields[r].dimensionofProperty[tableNum][0].ConvertedSales.replace(',',''))+parseFloat(this.repeatableFields[r].dimensionofProperty[tableNum][1].ConvertedSales.replace(',','')))/2)*
       ((parseFloat( this.repeatableFields[r].dimensionofProperty[tableNum][2].ConvertedSales.replace(',',''))+parseFloat(this.repeatableFields[r].dimensionofProperty[tableNum][3].ConvertedSales.replace(',','')))/2)
   
       extendValue = extendValue.toString().replaceAll(',', '')
       convertedSalesExtend = convertedSalesExtend.toString().replaceAll(',', '')
       if (parseFloat(extendValue) > 999)
       this.repeatableFields[r].dimensionofProperty[tableNum][4].DimensionAsPerDeed= parseFloat(extendValue).toFixed(2).replace(/(\d)(?=(\d{2})+\d\.)/g, '$1,')
       else {
          // Format with two decimal places if valid number (not NaN)
         if (!isNaN(extendValue))
         extendValue=parseFloat(extendValue).toFixed(2)
         else
           return;
       this.repeatableFields[r].dimensionofProperty[tableNum][4].DimensionAsPerDeed=extendValue
       }
       if (parseFloat(convertedSalesExtend) > 999)
       this.repeatableFields[r].dimensionofProperty[tableNum][4].ConvertedSales= parseFloat(convertedSalesExtend).toFixed(2).replace(/(\d)(?=(\d{2})+\d\.)/g, '$1,')
       else {
         if (!isNaN(convertedSalesExtend))
         this.repeatableFields[r].dimensionofProperty[tableNum][4].ConvertedSales=parseFloat(convertedSalesExtend).toFixed(2)
         else
           return;
       }
       }
  // }
   }

  dimensionActualCal(tableNum, index, r) {
    // Check if the index is either 0 or 2
   // if (index == 0 || index == 2) { //vRR-1008 issue fix
      // Check if DimensionAsPerActual values at index 0 and 2 are empty
      if( this.repeatableFields[r].dimensionofProperty[tableNum][0].DimensionAsPerActual==''|| 
      this.repeatableFields[r].dimensionofProperty[tableNum][1].DimensionAsPerActual==''||
      this.repeatableFields[r].dimensionofProperty[tableNum][2].DimensionAsPerActual==''|| 
      this.repeatableFields[r].dimensionofProperty[tableNum][3].DimensionAsPerActual=='') {     // If either value is empty, set DimensionAsPerActual at index 4 to an empty string
        this.repeatableFields[r].dimensionofProperty[tableNum][4].DimensionAsPerActual = '';
      } else {
        let extendValue;
        // Calculate the product of DimensionAsPerActual values at index 0 and 2
        extendValue=((parseFloat( this.repeatableFields[r].dimensionofProperty[tableNum][0].DimensionAsPerActual.replace(',',''))+parseFloat(this.repeatableFields[r].dimensionofProperty[tableNum][1].DimensionAsPerActual.replace(',','')))/2)*
   ((parseFloat( this.repeatableFields[r].dimensionofProperty[tableNum][2].DimensionAsPerActual.replace(',',''))+parseFloat(this.repeatableFields[r].dimensionofProperty[tableNum][3].DimensionAsPerActual.replace(',','')))/2)

        // Remove commas from extendValue
        extendValue = extendValue.toString().replaceAll(',', '');
        
        // Format and assign the calculated value to DimensionAsPerActual at index 4
        if (parseFloat(extendValue) > 999) {
          // Format with commas and two decimal places if greater than 999
          this.repeatableFields[r].dimensionofProperty[tableNum][4].DimensionAsPerActual = parseFloat(extendValue).toFixed(2).replace(/(\d)(?=(\d{2})+\d\.)/g, '$1,');
        } else {
          // Format with two decimal places if valid number (not NaN)
          if (!isNaN(extendValue)) {
            extendValue = parseFloat(extendValue).toFixed(2);
          }
          this.repeatableFields[r].dimensionofProperty[tableNum][4].DimensionAsPerActual = extendValue;
        }
      }
      // Call variationCalc function with the appropriate arguments
      this.variationCalc(tableNum, index, 1, r);
      // Call UnitAsPerSaleValue function with the appropriate arguments
      this.UnitAsPerSaleValue(event, tableNum, index, 1, r);
   // }
  }  

  variationCalc(tableNum, index, flag, r) {
    let arrayOfdimension;
    if (flag == 1) {
      // If the flag is 1, assign the corresponding array from repeatableFields
      arrayOfdimension = this.repeatableFields[r].dimensionofProperty[tableNum];
    } else {
      // Otherwise, assign the corresponding array from rowforPolygon
      arrayOfdimension = this.rowforPolygon[tableNum];
    }

    for (let i = 0; i < arrayOfdimension.length; i++) {
      if (arrayOfdimension[i].DimensionAsPerActual !== '' && arrayOfdimension[i].ConvertedSales !== '') {
        // Calculate the variation by subtracting DimensionAsPerActual from ConvertedSales
        arrayOfdimension[i].Variation = parseFloat(this.removeCurrencyFormat(arrayOfdimension[i].ConvertedSales)) - parseFloat(this.removeCurrencyFormat(arrayOfdimension[i].DimensionAsPerActual));
        // Set the background color based on the variation value
        if (parseFloat(arrayOfdimension[i].Variation) === 0) {
          $('#variation' + r + tableNum + i).css('background-color', 'green');
        } else if (parseFloat(arrayOfdimension[i].Variation) < 0) {
          $('#variation' + r + tableNum + i).css('background-color', '#f13131');
        } else {
          $('#variation' + r + tableNum + i).css('background-color', 'transparent');
        }
  
        // Format the variation value based on its magnitude
        if (parseFloat(arrayOfdimension[i].Variation) > 999) {
          arrayOfdimension[i].Variation = parseFloat(arrayOfdimension[i].Variation).toFixed(2).replace(/(\d)(?=(\d{2})+\d\.)/g, '$1,');
        } else {
          if (!isNaN(arrayOfdimension[i].Variation)) {
            arrayOfdimension[i].Variation = parseFloat(arrayOfdimension[i].Variation).toFixed(2);
          } else {
            arrayOfdimension[i].Variation = '';
          }
        }
      }
    }
  }
  


  showTable(eve, index) {
    // Get the value of the target element triggering the event
    let check = eve.target.value;
    // Use a switch statement based on the value of 'check'
    switch (check) {
      case 'Regular':
        // Show the element with ID 'tabledynamic' + index
        $('#tabledynamic' + index).show();
        // Hide the element with ID 'tabledynamicPolygon' + index
        $('#tabledynamicPolygon' + index).hide();
        break;
      case 'Polygon':
        // Show the element with ID 'tabledynamicPolygon' + index
        $('#tabledynamicPolygon' + index).show();
        // Hide the element with ID 'tabledynamic' + index
        $('#tabledynamic' + index).hide();
        break;
      default:
        // Show the element with ID 'tabledynamic' + index
        $('#tabledynamic' + index).show();
        // Hide the element with ID 'tabledynamicPolygon' + index
        $('#tabledynamicPolygon' + index).hide();
        break;
    }
  }  

  Reset(tableNum, index, row) {
    // Reset the 'UOM' property of the specified element in the repeatableFields array
    this.repeatableFields[row].dimensionofProperty[tableNum][index].UOM = '';
    // Set the value of the element with ID 'UOM' + tableNum + index to an empty string
    $('#UOM' + tableNum + index).val('');
  }
  

  closeForm(r) {
    if (window.innerWidth < 768) {
      // Remove the 'show' class and add the 'hiding' class to the modal element
      $('#createModal' + r).removeClass('show').addClass('hiding');
      // Delay the following actions to allow time for the animation to complete
      setTimeout(() => {
        // Remove the 'hiding' class
        $('#createModal' + r).removeClass('hiding');
        // Remove the 'modal-open' class from the body element
        $('body').removeClass('modal-open');
        // Hide the modal using the Bootstrap modal('hide') method
        $('#createModal' + r).modal('hide');
      }, 250);
      // Set the 'sucess_wrapper' property to false
      this.sucess_wrapper = false;
    } else {
      // Hide the modal using the Bootstrap modal('hide') method
      $('#createModal' + r).modal('hide');
      // Set the 'sucess_wrapper' property to false
      this.sucess_wrapper = false;
    }
  }
  

  addBuilding() {
    if(this.StructureofBuildingOthers==undefined||this.StructureofBuildingOthers.trim()=='')
    {
      Swal.fire("", "Please enter the Structure of Building", "info")
      return;
    }
    this.newDimension = [[
      {
        Direction: 'North',
        DimensionAsPerActual: '',
        UnitAsPerActual: '',
        DimensionAsPerDeed: '',
        UnitAsPerSale: '',
        ConvertedSales: '',
        ConvertedUnit: '',
        Variation: '',
        VariationUnit: '',
        Remarks: '',
      }, {
        Direction: 'South',
        DimensionAsPerActual: '',
        UnitAsPerActual: '',
        DimensionAsPerDeed: '',
        UnitAsPerSale: '',
        ConvertedSales: '',
        ConvertedUnit: '',
        Variation: '',
        VariationUnit: '',
        Remarks: '',
      }, {
        Direction: 'East',
        DimensionAsPerActual: '',
        UnitAsPerActual: '',
        DimensionAsPerDeed: '',
        UnitAsPerSale: '',
        ConvertedSales: '',
        ConvertedUnit: '',
        Variation: '',
        VariationUnit: '',
        Remarks: '',
      }, {
        Direction: 'West',
        DimensionAsPerActual: '',
        UnitAsPerActual: '',
        DimensionAsPerDeed: '',
        UnitAsPerSale: '',
        ConvertedSales: '',
        ConvertedUnit: '',
        Variation: '',
        VariationUnit: '',
        Remarks: '',
      },
      {
        Direction: 'Extent',
        DimensionAsPerActual: '',
        UnitAsPerActual: '',
        DimensionAsPerDeed: '',
        UnitAsPerSale: '',
        ConvertedSales: '',
        ConvertedUnit: '',
        Variation: '',
        VariationUnit: '',
        Remarks: '',
      }
    ]]
    this.repeatableFieldsnew = {
      rows: [0],
      StructureofBuilding: this.StructureofBuildingOthers,
      dynamicFile1: [],
      dynamicFile2: [],
      BuildingInsured: '',
      TypeofConstruction: '',
      TypeofConstructionRemarks: '',
      compound: '',
      ApperanceOfBuilding: '',
      Construction: '',
      Remarks: '',
      BuildingInterior: '',
      BuildingExterior: '',
      GrossAdvanceAmount: '',
      GrossMonthrent: '',
      Shape: 'Regular',
      liveableCondition: '',
      occupied: '',
      occupiedbyTenant: '',
      currentTenant: '',
      Proof: '',
      dynamicArray: [{ floor: '0', reported: '', observed: '', deed: '', completed: '' }],
      contactArray : [{ floor1: "0", roof: "", plinthAreaMain: "", plinthAreaCantilevered : "", plinthAreaTotal: "", roomDetail: "" }],
      dimensionofProperty: this.newDimension,
      buildConstruct: '',
      buildConstructtxt: '',
      extentofBuilding:'',
      Dateofissue:'',
      validityLayout:'',
      approvedAuthority:'',
      approvingAuthorities:'',
      ApprovalDate:'',
      ApprovalValidityStartDate:'',
      ApprovalValidityEndDate:'',
      additionalNotesAppro:'',
      completionCertificate:'',

    }
    this.repeatableFields.push(this.repeatableFieldsnew);
    this.StructureofBuildingOthers=''
    setTimeout(() => {
      let btn = document.querySelectorAll('.addbuilding');
      // Show all elements with the class 'addbuilding'
      $(document.querySelectorAll('.addbuilding')).show();
      // Check if there are more than one 'addbuilding' elements
      if (btn.length !== 1) {
        for (var i = 0; i < btn.length - 1; i++) {
          if (i === btn.length - 1) {
            // Show the last 'addbuilding' element
            $(document.querySelectorAll('.addbuilding')[i]).show();
          } else {
            // Hide all other 'addbuilding' elements
            $(document.querySelectorAll('.addbuilding')[i]).hide();
          }
        }
      }
    }, 100);    
  }

  deleteBuilding(index) {
    // Check if the repeatableFields array has only one element
    if(index === 0) return;
    if (this.repeatableFields.length == 1) {
      // Push the repeatableFieldsnew object (presumably a default building) to the repeatableFields array
      this.repeatableFields.push(this.repeatableFieldsnew);
      this.TotalPlinthArea=''
      
    }
    // Remove the element at the specified index from the repeatableFields array
    this.repeatableFields.splice(index, 1);
    debugger;
    this.plinthAreaTotal(index);
    return;
  }
  
  changeFormat(r, a, i, flag) {
    let dimension, convertedDimension;
    // Determine the appropriate dimension based on the flag value
    if (flag === 1)
      dimension = this.repeatableFields[r].dimensionofProperty[a][i].DimensionAsPerActual;
    else if (flag === 2)
      dimension = this.repeatableFields[r].dimensionofProperty[a][i].DimensionAsPerDeed;
    else if (flag === 3)
      dimension = this.repeatableFields[r].dimensionofProperty[a][i].ConvertedSales;

    // Check if the dimension is not empty
    if (dimension !== '') {
      // Remove all commas from the dimension string
      dimension = dimension.toString().replaceAll(',', '');
      // Check if the parsed dimension value is greater than 999
      if (parseFloat(dimension) > 999) {
        // Format the dimension with 2 decimal places and add commas for thousands separator
        convertedDimension = parseFloat(dimension).toFixed(2).replace(/(\d)(?=(\d{2})+\d\.)/g, '$1,');
      } else {
        // Check if the dimension is a valid number
        if (!isNaN(dimension))
          convertedDimension = parseFloat(dimension).toFixed(2);
      }
  
      // Update the dimension value based on the flag
      if (flag === 1)
        this.repeatableFields[r].dimensionofProperty[a][i].DimensionAsPerActual = convertedDimension;
      else if (flag === 2)
        this.repeatableFields[r].dimensionofProperty[a][i].DimensionAsPerDeed = convertedDimension;
      else
        this.repeatableFields[r].dimensionofProperty[a][i].ConvertedSales = convertedDimension;
    }
  }
  

  /*   added for VRR-836 Release 46 -by franklin   Code started */
  // Remove comma from the value and convert into float value
  removeCurrencyFormat(val) {
    // Check if the value is not empty or undefined
    if (val != '' && val != undefined) {
      // Convert the value to a string, replace all commas with empty strings
      val = parseFloat(val.toString().replace(/,/g, ''));
      // Return the modified value
      return val;
    }
  }

  minenddate(index) {
    // Check if approvalValidityStartDate is not an empty string and not undefined
    if (this.repeatableFields[index].ApprovalDate  != '' && this.repeatableFields[index].ApprovalDate != undefined 
    &&  this.repeatableFields[index].Dateofissue  != '' && this.repeatableFields[index].Dateofissue != undefined
    )
    
   if (this.repeatableFields[index].ApprovalDate < this.repeatableFields[index].Dateofissue) 
debugger;
    if (this.repeatableFields[index].ApprovalDate  != '' && this.repeatableFields[index].ApprovalDate != undefined
    ) {
      // Convert approvalValidityStartDate to a string Dateofissue
      var converttomindate = this.repeatableFields[index].ApprovalDate.toString();
      // Split the date string using '-' as the separator
      var splitedDate = converttomindate.split('-');
      // Create a new Date object with the year, month, and day in the correct order
      this.approvalValiditiyMinDate[index]= new Date(splitedDate[2] + '-' + splitedDate[1] + '-' + splitedDate[0]);
      
    }
    if (this.repeatableFields[index].Dateofissue  != '' && this.repeatableFields[index].Dateofissue != undefined
    ) {
      // Convert approvalValidityStartDate to a string Dateofissue
      var converttomindate = this.repeatableFields[index].Dateofissue.toString();
      // Split the date string using '-' as the separator
      var splitedDate = converttomindate.split('-');
      // Create a new Date object with the year, month, and day in the correct order
      this.approvalValiditiyMinDate[index]= new Date(splitedDate[2] + '-' + splitedDate[1] + '-' + splitedDate[0]);
      
    }
  }
  /*   added for VRR-836 Release 46 -by franklin   Code ended */

  // below function used reset the value based on the selection
  show_hide(flag: Number, row: any) {
    if (flag == 0) {
      if (this.repeatableFields[row].buildConstruct == 'No') {
        this.repeatableFields[row].buildConstructtxt = '';
      }
    }
    if (flag == 1) {
      if (this.repeatableFields[row].StructureofBuilding != 'Main Building') {
        this.repeatableFields[row].buildConstruct = '';
        this.repeatableFields[row].buildConstructtxt = '';
      }
    }
  }

  displayAddBtn(r:any){
    setTimeout(() => {
      let btn = document.querySelectorAll('#addbtn1'+r);
      $(document.querySelectorAll('#addbtn1'+r)).show()
      if (btn.length != 1)
        for (var i = 0; i < btn.length - 1; i++) {
          if (i == btn.length -1) {
            $(document.querySelectorAll('#addbtn1'+r)[i]).show()
          }
          else{
            $(document.querySelectorAll('#addbtn1'+r)[i]).hide()
          }
        }
    }, 300);
  }

  onInputChange(event: any) {
    validateCurrency(event)
  }

  updateStructure(row:any,display:boolean){
    if(display){
      this.updateBuilding[row] = true
      this.updateBuildingName[row] = false
    }else{
      let structureName = this.validateStructureName()
      if(!structureName) return;
      this.updateBuilding[row] = false
      this.updateBuildingName[row] = true
    }
  }

  validateStructureName(){
    for (let i = 0; i < this.repeatableFields.length; i++) {
      const element = this.repeatableFields[i];
      if(element.StructureofBuilding == ''){
        Swal.fire('', 'Structure of building should not be Empty', 'info');
        return false; 
      }
    }
    return true;
  }
}
