export class Manage {
    public id: string = "";
    public first_name: string = "";
    public last_name: string = "";
    public email: string = "";
    public country: string = "";
    public industry: string = "";
    public contact: string = "";
    public checked: Boolean = false;
}
export class ManagePaymentDetail {
    public id: string = "";
    public invoice_id: string = "";
    public createdAt: string = "";
    public status: string = "";
    public invoice_link: string = "";
}
export class ManagePackageDetail {
    public id: number = -1;
    public title: string = "";
    public price: number = 0;
    public checkout_page: string = "";
    public description: string  = "";
}
export class ManageProgramDetail {
    public id: number = -1;
    public expiry_date: string = "";
    public checkout_page: string = "";
    public package_id: number = -1;
}

export class FormResponseList {
    public formResponseList: Manage[] = [];
}