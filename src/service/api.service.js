import { dataSample, dataCategory } from '../data/fake.data'; 

class APIService {
    async fetchDataCategory (){
        // thêm thời gian vô cho giống fetch api thật
        return new Promise((resolve) => {
            setTimeout(() => resolve(dataCategory), 500)
        })
    }

    async fetchDataSampleCategory(){
        return new Promise((resolve) => {
            setTimeout(() => resolve(dataSample), 500)
        })
    }

    async fetchDataSampleCategoryWithPage(page, itemsPerpage) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const start = page * itemsPerpage;
                const end = start + itemsPerpage;
                const paginatedData = dataSample.slice(start, end);
    
                // Tạo ra cấu trúc trả về bao gồm dữ liệu cho trang hiện tại và tổng số trang
                resolve({
                    items: paginatedData,
                    totalItems: dataSample.length,
                    totalPages: Math.ceil(dataSample.length / itemsPerpage),
                });
            }, 0);
        });
    }
    

}

export default new APIService()