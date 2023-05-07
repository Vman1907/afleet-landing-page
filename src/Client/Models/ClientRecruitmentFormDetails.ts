export default class ClientRecruitmentFormDetails {
    id:string = "" ;
    element: string ="";
    text: string="";
    static: boolean=true;
    required: boolean = false;
    bold: boolean = false;
    italic: boolean = false;
    content:string = "";
    canHavePageBreakBefore: boolean = true;
    canHaveAlternateForm: boolean = true;
    canHaveDisplayHorizontal: boolean = true;
    canHaveOptionCorrect: boolean = true;
    canHaveOptionValue: boolean = true;
    canPopulateFromApi: boolean = true;

}