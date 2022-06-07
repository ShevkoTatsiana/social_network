export  const convertFormData = <DataType>(data: DataType) => {
    const formData = new FormData();
    for (let key in data) {
      // @ts-ignore 
        formData.append(key, data[key as keyof DataType])    
      };
    return formData;
};
