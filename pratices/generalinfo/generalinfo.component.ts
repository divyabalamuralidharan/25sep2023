import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { trigger, transition, animate, style } from '@angular/animations';
//import { FormGroup, FormControl } from '@angular/forms';
import { DynamicGrid } from './../contract.model';
import { AppraisalService } from '../../common-services/appraisal.service'
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { fromPairs, sample } from 'lodash';
import { DatePipe } from '@angular/common';
import { TopmenuComponent } from './../topmenu/topmenu.component';
import { validateCurrency } from 'src/app/common-TS/commonFun';


@Component({
  selector: 'app-generalinfo',
  templateUrl: './generalinfo.component.html',
  styleUrls: ['./generalinfo.component.css']
})
export class GeneralinfoComponent implements OnInit {

  dynamicArray: Array<DynamicGrid> = [];
  ValuationID;
  UserId;
  Appraisalstatus:any;
  PropertyID;
  PropertyType;
  newDynamic: any = {};
  addRow = false;
  currentDate: any
  InspectionDate: any;
  property;
  // form = new FormGroup({
  //   dateYMD: new FormControl(new Date()),
  // });
  disablingdiv;
  AssignedDate;
  PropertySiteName;
  owningproperty;
  Listdocumentsperusal;
  ScopeValuation;
  Nameofbank;
  Branchbankappraisal;
  Valuerassociationdropdown;
  Personsvisitingsite;
  ValuationPurpose;
  BriefDescriptionProperty;
  ValuationDate;
  retrieve;
  BorrowerID;
  AssignDate;
  minstartdate
  mininspedate
  AppraiserID;
  valueassociation = []
  valueassociation2 = []
  percent = 0;
  Address;
  associationedit:boolean;
   total:number;
  PropertyID1;
  UnitOfMeasure;
  Measure;
  startDate;
  endDate;
  hypothecationStatus;
  hypothecationDocValue:any = '';
  withWhom;
  Hypothecated;
  currentstatusdetail;
  hypothecatedStatus;
  minEndEate;
  HypothicationCanceled:boolean = false;

  HypothicationStatusValid:boolean = false;
  HypothicationStatusClosed:boolean = false;
  HypothicationCancelYes:boolean = false;
  
  hypothecationAmount:any = '';
  hypothcationCancelDate:any;
  closedDate:any;
  closingAmount:any = '';
  hypothcationCancelDoc:any = [];
  fileExt;
  GeneralId = ['ValuationPurpose', 'InspectionDate', 'ValuationDate', 'owningproperty', 'PropertySiteName',
    'Listdocumentsperusal', 'BriefDescriptionProperty', 'ScopeValuation', 'Nameofbank', 'Personsvisitingsite',
    'Branchbankappraisal', 'save', 'save1', 'Name', 'Address', 'phone', 'share0','share1','share2','share3', 'add', 'delete','UnitOfMeasure', 
    'hypothecationAmount', 'startDate', 'endDate', 'withWhom', 'Valid', 'Closed', 'hypothecationPendingAmount', 'closedDate', 'closingAmount',
    'Hypothecated_Cancel_Yes', 'Hypothecated_Cancel_No', 'hypothcationCancelDate', 'ExtraDocuments', 'file_upload01', 
  ]


  constructor(private AppService: AppraisalService, private router: Router,private topMenu:TopmenuComponent,
    private datePipe: DatePipe) { }
  ngOnInit(): void {

    this.total=0
    this.newDynamic = { name: " ", address: " ", phone: "", shares: " " };
    this.dynamicArray.push(this.newDynamic);
    this.UserId = sessionStorage.getItem('UserId');
    // this.router.queryParams.subscribe((params) => {
    //   this.ValuationID = params.ValuationID;
    //   this.Appraisalstatus = params.Appraisalstatus;
    //   this.PropertyType = params.PropertyType
    // });

    // sessionStorage.setItem('ValuationID', this.ValuationID)
    // sessionStorage.setItem('Appraisalstatus', this.Appraisalstatus)
    // sessionStorage.setItem('PropertyType', this.PropertyType)
    this.ValuationID = sessionStorage.getItem('ValuationID');
    this.Appraisalstatus = sessionStorage.getItem('Appraisalstatus');
    this.PropertyType = sessionStorage.getItem('PropertyType');
    this.OnLoadGetdata(this.Appraisalstatus);
    // this.InspectionDate=this.currentDate;
    // this.InspectionDate = this.datePipe.transform(this.currentDate, 'dd-MM-yyyy')
    // $('input[name="property"]').attr('disabled', 'disabled');
//     const obj1 = {
//       'ParentParamID': '5006',
//       'ParamName':'Measurement'
//     }
//     this.UnitOfMeasure=[];
//     this.AppService.RetrieveParentValue(obj1).subscribe(res1 => {
//       for(const measure of res1)
//       this.UnitOfMeasure.push(measure.ParamValue)
//  })

    this.disablesavebtn();

  }
  // To avoid to allowing Special char
  blockSpecialChar(e) {
    e = e || window.event;
    var charCode = typeof e.which == "undefined" ? e.keyCode : e.which;
    var charStr = String.fromCharCode(charCode);
    if (!charStr.match(/^[0-9]+$/)) e.preventDefault();
  }
  OnLoadGetdata(Appraisalstatus) {
    const obj = {
      'ValuationID': this.ValuationID
    }
    this.AppService.GetValuationIddetails(obj).subscribe(res => {
      // console.log("res",res);
      this.AppraiserID=res[0].AppraiserID
      this.Valuerassociationdropdown = res[0].ValuerAssociationName
      if (this.Valuerassociationdropdown != undefined) {
         $('#Valuerassociationdropdown').attr("disabled", "disabled");
         $('#Valuerassociationdropdown').css('cursor', 'not-allowed');
      this.associationedit=false
      }
else{
  this.associationedit=true

  const obj2 = {
    'UserID': this.AppraiserID
  }
  var assodetail = []
  this.AppService.GetUserDetails(obj2).subscribe(res2 => {
    assodetail = res2[0].AssociationDetails
    for (let i of assodetail) {
      this.valueassociation.push(i)
    }
    // this.valueassociation = this.valueassociation
    this.valueassociation2 = this.valueassociation
    if(res2[0].AssociationDetails[0] != undefined)
    if(res2[0].AssociationDetails[0].name != undefined && res2[0].AssociationDetails[0].name != '')
    this.valueassociation = res2[0].AssociationDetails[0].name
  })
}
      this.PropertyID = res[0].PropertyID
      this.getaddress(res[0].PropertyID)
      // this.BorrowerID = res[0].BorrowerID
      this.getusername(res[0].BorrowerID)
      this.ValuationPurpose = res[0].ValuationPurpose
      this.InspectionDate = this.datePipe.transform(res[0].DateofInspection, 'dd-MM-yyyy')
      // this.ValuationDate =  res[0].ValuationDate
      this.ValuationDate = this.datePipe.transform(res[0].ValuationDate, 'dd-MM-yyyy');
  //  this.Measure=res[0].UnitOfMeasure
      this.Listdocumentsperusal = res[0].ValuationDocs
      this.owningproperty = res[0].owningproperty
      this.Nameofbank = res[0].NameOfBank
      this.ScopeValuation = res[0].ValuationScope
      this.Personsvisitingsite = res[0].PersonAccompanied
      this.Branchbankappraisal = res[0].ReportForBankBranch
      this.BriefDescriptionProperty = res[0].BriefDescriptionProperty
      this.property = res[0].property
      this.withWhom = res[0].withWhom
      if(res[0].hypothecationDocValue != "" && res[0].hypothecationDocValue != null && res[0].hypothecationDocValue != undefined){
      this.hypothecationDocValue = parseFloat(res[0].hypothecationDocValue).toFixed(2).replace(/(\d)(?=(\d{2})+\d\.)/g, '$1,')
      }
      if(res[0].hypothecatedStatus != undefined && res[0].hypothecatedStatus != null && res[0].hypothecatedStatus != ""){
        this.hypothecatedStatus = res[0].hypothecatedStatus
      }
      if(res[0].startDate !+ undefined && res[0].startDate != null && res[0].startDate != ''){
        this.startDate = this.datePipe.transform(res[0].startDate, 'dd-MMM-yyyy')
      }
      if(res[0].endDate != undefined && res[0].endDate != null && res[0].endDate != ''){
        this.endDate = this.datePipe.transform(res[0].endDate, 'dd-MMM-yyyy')
      }
      if(res[0].hypothecationAmount != undefined && res[0].hypothecationAmount != '' && res[0].hypothecationAmount != null){
        this.hypothecationAmount = this.return_currencyFormat(res[0].hypothecationAmount)
      }
      if(res[0].hypothecationStatus != undefined && res[0].hypothecationStatus != "" && res[0].hypothecationStatus != null){
        this.hypothecationStatus = res[0].hypothecationStatus
        if(this.hypothecationStatus == "Valid"){
          if(res[0].hypothecationDocValue != undefined && res[0].hypothecationDocValue != '' && res[0].hypothecationDocValue != null){
            this.hypothecationDocValue = this.return_currencyFormat(res[0].hypothecationDocValue)
          }
        }else{
          if(res[0].closingAmount != undefined && res[0].closingAmount != '' && res[0].closingAmount != null){
            this.closingAmount = this.return_currencyFormat(res[0].closingAmount)
          }
          if(res[0].closedDate != undefined && res[0].closedDate !='' && res[0].closedDate != null){
            this.closedDate = this.datePipe.transform(res[0].closedDate)
          }
          if(res[0].Hypothecated != undefined && res[0].Hypothecated != null && res[0].Hypothecated != ""){
            this.Hypothecated = res[0].Hypothecated
            if(res[0].Hypothecated == 'HypothecatedYes'){
              if(res[0].hypothcationCancelDate != undefined && res[0].hypothcationCancelDate != '' && res[0].hypothcationCancelDate != null){
                this.hypothcationCancelDate = this.datePipe.transform(res[0].hypothcationCancelDate)
              }
            }
            this.HypothecationStatus(2)
          }
        }
        this.HypothecationStatus(1)
      }
      if(res[0].hypothcationCancelDoc != undefined && res[0].hypothcationCancelDoc != null && res[0].hypothcationCancelDoc.length != 0){
        this.hypothcationCancelDoc = res[0].hypothcationCancelDoc;
      }

      this.currentstatusdetail = res[0].currentstatusdetail
      if (res[0].OwnerDetails != null && res[0].OwnerDetails != undefined)
        this.dynamicArray = res[0].OwnerDetails;

      this.AssignDate = this.formatDate(res[0].AssignDate);
      var prop = this.PropertyID
      const obj1 = { PropertyID: prop };   //To get Property details
      sessionStorage.setItem('PropertyID', this.PropertyID)
      this.AppService.GetLocationDetails(obj1).subscribe(res1 => {
        if (res1[0].ProjectSiteName != undefined) {
          this.PropertySiteName = res1[0].ProjectSiteName
        }
        this.AssignedDate = this.formatDate(res1[0].ModifiedDate)
        this.property = res1[0].Location
      })
      if (Appraisalstatus == 'Approved' || Appraisalstatus == 'Rejected'){
        //Malathi-Hypothecated details disable-start
        var id = ['hypothecationDocValue','startDate','endDate','withWhom','Valid','Closed','Cancelled','currentstatusdetail','HypothecatedYes','HypothecatedNo',
      'hypothecationDocValue','startDate','endDate','withWhom','Valid','Closed','Cancelled','currentstatusdetail']
      //Malathi-Hypothecated details disable-start
        id.forEach(element => {
          $('#'+element).val('')
          $('#'+element).prop('disabled', true)
          $('#'+element).css('cursor', 'not-allowed');
       })
      }
      if (Appraisalstatus == 'Approved' || Appraisalstatus == 'Rejected') {
        $('#Personsvisitingsite').attr("disabled", "disabled");
        setTimeout(() => { 
          let uploadBtn = document.querySelectorAll(`.btn-close,.deletebtn, .upload_btn, .save-btn, .form-button, 
          .form-control, input[type="radio"], .form-select, .table-input, .add-row-icon, .delete-icon`) as NodeListOf<HTMLInputElement>;
          for (let i = 0; i < uploadBtn.length; i++) {
            let inputElement = uploadBtn[i]
            inputElement.style.cursor = 'not-allowed';
            inputElement.disabled = true;
          }
          $('.btn-close').attr('disabled', 'disabled')
          $('.btn-close').attr('disabled', 'disabled').css('cursor', 'not-allowed');
          $('.filename').attr('disabled', 'disabled')
          $('.filename').css('cursor', 'not-allowed')
          $('#Valuerassociationdropdown').attr("disabled", "disabled");
          $('#Valuerassociationdropdown').css('cursor', 'not-allowed');
        }, 0);

      }
      else if (Appraisalstatus == 'InProgress') {
        // for (const id of this.GeneralId) {
        //     $('#' + id).removeAttr("disabled");
        //   $('#' + id).css('cursor', '');
        //   // $("input[type=radio]").removeAttr('disabled');
        // }
        let uploadBtn = document.querySelectorAll(`.btn-close,.deletebtn, .upload_btn, .save-btn, .form-button, 
          .form-control, input[type="radio"], .form-select, .table-input, .add-row-icon, .delete-icon`) as NodeListOf<HTMLInputElement>;
        for (let i = 0; i < uploadBtn.length; i++) {
          let inputElement = uploadBtn[i]
          inputElement.style.cursor = '';
          inputElement.disabled = false;
        }
        $('#PropertyType').attr('disabled', 'disabled')
        $('#Personsvisitingsite').removeAttr("disabled");
        $('.btn-close').removeAttr('disabled');
        $('.btn-close').css('cursor', 'not-allowed');
        $('.filename').removeAttr('disabled');
        $('.filename').css('cursor', 'not-allowed');
      }
    });

  }

  addNewRow() {
    for (var i = 0; i < this.dynamicArray.length; i++) {
      if (this.dynamicArray[i].address == "" || this.dynamicArray[i].name == "" || this.dynamicArray[i].phone == "" || this.dynamicArray[i].shares == "" || this.dynamicArray[i].name == " " || this.dynamicArray[i].address == " " || this.dynamicArray[i].phone == " " || this.dynamicArray[i].shares == " ") {
        Swal.fire('', 'Please Fill the Owner Details', 'info')
        return false
      }
      if(this.dynamicArray[i].phone.length != 10){
        Swal.fire('', 'Please Provide a Valid Phone Number', 'info')
        return false
      }
    }
    if (this.CalculateShare(this.dynamicArray.length - 1, 0)) {//VRR-975 issue fix
      this.newDynamic = { name: "", address: "", phone: "", shares: "" };
      this.dynamicArray.push(this.newDynamic);
      return true;
    }  
  }
  deleteRow(index: number) {
    if (this.dynamicArray.length == 1) {
      return false;
    } else {
      this.dynamicArray.splice(index, 1);
      return true;
    }
  }
  sideMenuToggle() {
    $('.sidebar-float').toggleClass('open');
  }
  formatDate(date) {
    date = date.split('-');
    return date[2].slice(0, 2) + '-' + date[1] + '-' + date[0]
  }
  SaveGeneralDetails(opt: any) {
    for (var i = 0; i < this.dynamicArray.length; i++) {
      if ((this.dynamicArray[i].name.trim() == '' || this.dynamicArray[i].name == undefined || this.dynamicArray[i].name == null) ||
        (this.dynamicArray[i].address.trim() == '' || this.dynamicArray[i].address == undefined || this.dynamicArray[i].address == null) ||
        (this.dynamicArray[i].phone == undefined || this.dynamicArray[i].phone == null) ||
        (this.dynamicArray[i].shares == '' || this.dynamicArray[i].shares == null || this.dynamicArray[i].shares == undefined)) {
        Swal.fire({
          // title: 'General Information',
          text: 'Please fill the mandatory fields.',
          icon: 'warning',
          showCancelButton: false,
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.isConfirmed) {

          }
        });
        return false;
      }
      if(this.dynamicArray[i].phone.length != 10){
        Swal.fire('', 'Please Provide a Valid Phone Number', 'info')
        return false
      }
    }

    // *************check start date is greatr than end date****added by Naveen*********************

    if(this.endDate != undefined && this.endDate != null &&  this.endDate != "" && this.startDate != undefined && this.startDate != null &&  this.startDate != "" )
    if(this.saveformatdate(this.endDate) < this.saveformatdate(this.startDate)){
    Swal.fire(" ","The Start Date should not be after the end date","info")
    return
    }

    // *************check start date is greatr than end date****added by Naveen*********************

    // this.ValuationDate= new Date(this.ValuationDate);
    // this.ValuationDate.toISOString().substring(0, 10);
    // this.InspectionDate= new Date(this.InspectionDate);
    // this.InspectionDate.toISOString().substring(0, 10);
    if(this.hypothecationDocValue == undefined || this.hypothecationDocValue == null){
      this.hypothecationDocValue = ""
    }
    const obj = {
      'ValuationID': this.ValuationID,
      'UserID': this.UserId,
      'PropertyID': this.PropertyID,
      'ValuationPurpose': this.ValuationPurpose,
      // 'InspectionDate': new Date(this.InspectionDate),
      // 'ValuationDate': new Date(this.ValuationDate),
      'BriefDescriptionProperty': this.BriefDescriptionProperty,
      'Ownerdetails': this.dynamicArray,
      'owningproperty': this.owningproperty,
      'Listdocumentsperusal': this.Listdocumentsperusal,
      'ScopeValuation': this.ScopeValuation,
      'Nameofbank': this.Nameofbank,
      'Branchbankappraisal': this.Branchbankappraisal,
      'Valuerassociationdropdown': this.Valuerassociationdropdown,
      'Personsvisitingsite': this.Personsvisitingsite,
      'PropertyType': this.PropertyType,
      'Projectsitename': this.PropertySiteName,
      'property': this.property,
      'Hypothecated': this.Hypothecated,
      'startDate': new Date(this.startDate),
      'endDate': new Date(this.endDate),
      'withWhom': this.withWhom,
      'hypothecationDocValue': this.hypothecationDocValue.replace(/,/g, ''),
      'hypothecationStatus': this.hypothecationStatus,
      'currentstatusdetail': this.currentstatusdetail,
      'hypothecatedStatus': this.hypothecatedStatus,
      'hypothecationAmount': this.hypothecationAmount.replace(/,/g, ''),
      'closedDate': new Date(this.closedDate),
      'closingAmount': this.closingAmount.replace(/,/g, ''),
      'hypothcationCancelDate': new Date(this.hypothcationCancelDate),
      'hypothcationCancelDoc': this.hypothcationCancelDoc

    }

    var idata = this.InspectionDate
    if(idata != undefined && idata != "" && idata != null){
    if (idata?.toString()?.indexOf('-') > 0) {
      var SplitDate = idata.toString().split('-')
      obj['InspectionDate'] = new Date(SplitDate[2] + '-' + SplitDate[1] + '-' + SplitDate[0]);
    } else {
      obj['InspectionDate'] = idata;
    }
  }
    var vdata = this.ValuationDate
    try {
      if (vdata?.toString()?.indexOf('-') > 0) {
        var SplitDate = vdata?.toString()?.split('-')
        obj['ValuationDate'] = new Date(SplitDate[2] + '-' + SplitDate[1] + '-' + SplitDate[0]);
      } else {
        obj['ValuationDate'] = vdata;
      }
    } catch (error) {
      console.log("error", error);

    }

    // return
    this.AppService.generalDetailsSave(obj).subscribe(res => {

      Swal.fire({
        title: 'General Information',
        text: 'Successfully Saved',
        icon: 'success',
        showCancelButton: false,
        allowOutsideClick: false, 
        confirmButtonText: 'OK',
      }).then((result) => {
        if (result.isConfirmed) {
            $(document.querySelectorAll('#active1')).show()
            $(document.querySelectorAll('#Inactive01')).hide()
          this.topMenu.ngOnInit();
          setTimeout(() =>{//         Fix given for VRR-576 Started
            if (opt == 'continue') {
              this.router.navigate(['/detailview/id/propertydescription']);
              $('html,body').animate({ scrollTop: 0 }, "slow");}
              window.scrollTo(0,0)
              document.documentElement.scrollTop=0
              document.body.scrollTop=0
            },100)  //    Fix given for VRR-576 Ended
          // if (opt == 'continue') {
          //   this.router.navigate(['/detailview/id/propertydescription']);
          // }
        }
      });
    });
  }
  saveformatdate(value:any){
    try {
      if (value.toString().indexOf('-') > 0) {
        var SplitDate = value.toString().split('-')
        return value = new Date(SplitDate[2] + '-' + SplitDate[1] + '-' + SplitDate[0]);
      } else {
        return value;
      }
    } catch (error) {
      console.log("error", error);
    }
  }
  minvaluationdate() {
    var converttomindate = this.InspectionDate.toString()
    var splitedDate = converttomindate.split('-')
    this.minstartdate = new Date(splitedDate[2] + '-' + splitedDate[1] + '-' + splitedDate[0])
  }
  mininspectdate() {
    var converttomindate = this.AssignDate.toString()
    var splitedDate = converttomindate.split('-')
    this.mininspedate = new Date(splitedDate[2] + '-' + splitedDate[1] + '-' + splitedDate[0])
  }
  minenddate() {
    var converttomindate = this.startDate.toString()
    var splitedDate = converttomindate.split('-')
    this.startDate = new Date(splitedDate[2] + '-' + splitedDate[1] + '-' + splitedDate[0])
  }

  // To avoid to allowing Special char
  // blockSpecialChar(e) {
  //   e = e || window.event;
  //     var charCode = typeof e.which == "undefined" ? e.keyCode : e.which;
  //     var charStr = String.fromCharCode(charCode);
  //     if (!charStr.match(/^[0-9]+$/)) e.preventDefault();
  // }
  // disable save btn when apprisal status approved/rejected
  disablesavebtn() {
    if (this.Appraisalstatus == "Approved" || this.Appraisalstatus == "Rejected") {
      $('#save').prop('disabled', true)
      $('#save').css('cursor', 'not-allowed')
      $('#save1').prop('disabled', true)
      $('#save1').css('cursor', 'not-allowed')
    }
  }
  getusername(borrowerid){
    var obj = {
      UserID: borrowerid
    }
    this.AppService.GetUserData(obj).subscribe(res => {
      this.BorrowerID = res[0].UserName
    });
  }
  getaddress(propertyid){
    const obj1 = {
      'PropertyID': propertyid
    }
    this.AppService.GetLocationDetails(obj1).subscribe(res_ => {
      this.PropertyID1 = res_[0].Address.AddArea + ', ' + res_[0].Address.City;
      this.Address = res_[0].Address.StreetName + ', ' + res_[0].Address.AddArea + ', ' + res_[0].Address.City
    });
  }
CalculateShare(index:any,flag) //VRR-975 issue fix
{
 // var total:number;
  var temptotal:number;
  if(this.dynamicArray[index].shares=='0'||this.dynamicArray[index].shares=='00')//VRR-1013 issue fix
  {
    this.dynamicArray[index].shares=""
    $('#share'+index).val("")
    Swal.fire("", "Owner shares(%) should not be 0", "info")
    return false
  }
  var y: number = +this.dynamicArray[index].shares
  if(y >100)
  {
    this.dynamicArray[index].shares=""
    Swal.fire("", "Owner shares(%) should not exceed 100 ", "info")
    return false
  }
else
{
this.total=0
temptotal=0
this.dynamicArray.forEach(element => {
  temptotal=+element.shares
  this.total+=temptotal
});
if( this.total>100)
   {
    this.dynamicArray[index].shares=""
  //  $('#shares'+index).text("")
    $('#share'+index).val("")
    Swal.fire("", "Owner shares(%) should not exceed 100 ", "info")
     return false
   }
   if(flag==0) //added for VRR-975 issue fix
   if(this.total==100)
   { 
     Swal.fire("", "Owner shares(%) should not exceed 100 ", "info")
     return false;
   }
   else
   return true;
}
}

checkcurrency(id:any) {
  let amount = $('#' + id).val()
  if (amount != '') {
    amount = amount.toString().replace(/,/g, '')
    if (parseFloat(amount) > 999){
      $('#' + id).val(parseFloat(amount).toFixed(2).replace(/(\d)(?=(\d{2})+\d\.)/g, '$1,'))
    }
    else {
      if(amount)
      $('#' + id).val(parseFloat(amount).toFixed(2))
    }
}
}

// VRR-921 - starting here
// below function is used to convert number to currency format withou decimal - added by Naveen
convert_currency_format(id:any){
  let amount = $('#' + id).val()
  if (amount != '') {
    amount = amount.toString().replace(/,/g, '')
    if (parseFloat(amount) > 999){
      $('#' + id).val(parseInt(amount).toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ','))
    }
  }
}

 return_currencyFormat(value:any){
    if(value != ''){
      return parseInt(value).toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')
    }
 }

// VRR-921 - ending here

// Hide and Show HypothecationStatus
checkHypothecationStaus(){
  if(this.hypothecationStatus == "Closed"){
    this.HypothicationCanceled = true
  }else{
    this.HypothicationCanceled = false
    this.Hypothecated = ""
  }
}

  // below function is used to hide/show the hypothecatin details - added by Naveen
  HypothecationStatus(id:Number){ 
    // 'Hypothecation Status' - (1)
    if(id === 1){
      if(this.hypothecationStatus == "Closed"){
        this.HypothicationStatusClosed = true;
        this.HypothicationStatusValid = false;
        this.hypothecationDocValue = '';
      }else{
        this.HypothicationStatusValid = true;
        this.HypothicationStatusClosed = false;
        this.closedDate = null;
        this.closingAmount = '';
        this.Hypothecated = null;
        this.hypothcationCancelDate = null;
        this.hypothcationCancelDoc = []
        this.HypothicationCancelYes = false;
      }
    }
    // 'Hypothecation Cancelled' (2)
    if(id === 2){
      if(this.Hypothecated == 'HypothecatedYes'){
        this.HypothicationCancelYes = true;
      }else{
        this.HypothicationCancelYes = false;
        this.hypothcationCancelDate = null;
        this.hypothcationCancelDoc = []
      }
    }
  }

  async fileuploadName1(event: any, flag) {
    //A variable to hold the image URL and image to show.
    let imageUrl: any;
    let imagetoshow: any;
    // An array to hold the uploaded files.
    let files: Array<File> = event.target.files;
    let tempArr = [...files]
    tempArr.map(val => {
      //allow (300 KB == 307200) for other files
      if (val.type == 'image/jpeg' || val.type == 'image/jpg' || val.type == 'application/pdf') {
        if (val.size > 307200) {
          Swal.fire("", 'Uploaded File should not exceed 300 KB', "info");
          event.target.value = '';
          return false;
        }
      } else {
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
          //this.imageUrl = this.imageUrl.substr(this.imageUrl.indexOf(',') + 1);
          fileObj['base64'] = imageUrl;
          fileObj['fileName'] = files[i]['name'];
          fileObj['flag'] = 1;
          // Depending on the value of flag...

          if(flag == 1){
            if (this.hypothcationCancelDoc.length != 0) {
              this.hypothcationCancelDoc.map((val, index) => {
                if (fileObj['fileName'] == val.fileName) {
                  // Remove the existing file object from the array.
                  this.hypothcationCancelDoc.splice(index, 1);
                }
              });
            }
            // Add the new file object to the array.
            this.hypothcationCancelDoc.push(fileObj);
            // Resolve the Promise with "success".
            return resolve('success')
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

  // below function is used to view the file
  View1(index, flag) {
    let imageURL = '';
    switch (flag) {
      case 1:
        imageURL = this.hypothcationCancelDoc[index].base64
        break;
      default:
        break;
    }
    //open new window
    let pdfWindow = window.open("")
    //write the imageURL data to the window
    pdfWindow.document.write(
      "<iframe width='100%' height='100%' src=" + imageURL + " ></iframe>")
  }

  //function used to remove the slected file
  closeUpload11(index, flag) {
    switch (flag) {
      case 1:
        this.hypothcationCancelDoc.splice(index, 1);
        break;
      default:
        break;
    }
  }
  onInputChange(event: any) {
    validateCurrency(event)    
  }
}
