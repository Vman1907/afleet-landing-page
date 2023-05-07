import writeXlsxFile from 'write-excel-file';

export const GenericExcelWriter = async (data: any, schema: any, name: string) => {
    await writeXlsxFile(data, { schema, fileName: name + ".xlsx" });
    // var wb = XLSX.utils.book_new();
}
export const SelectiveExcelWriter = async (data: any, schema: any, selection: any, name: string) => {
    var newData = [];
    for (var i = 0; i < data.length; i++) {
        if (selection[i] == true) {
            newData.push(data[i]);
        }
    }
    await writeXlsxFile(newData, { schema, fileName: name + ".xlsx" });
    // var wb = XLSX.utils.book_new();
}
export const SelectiveExcelWriterForRewards = async (data: any, schema: any, selection: any) => {
    var newData = [];
    for (var i = 0; i < data.length; i++) {
        if (data[i].status == selection) {
            newData.push(data[i]);
        }
    }
    await writeXlsxFile(newData, { schema, fileName: "Reward_Details" + ".xlsx" });
    // var wb = XLSX.utils.book_new();
}

