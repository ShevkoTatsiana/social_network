export  const groupBy = (arr, property) => {
    const grouppedArray = arr?.reduce(function(memo, x) {
      if (!memo[x[property]]) { memo[x[property]] = []; }
      memo[x[property]].push(x);
      return memo;
    }, {});
    return grouppedArray;
};

export const sortLevel = (arr) => {
    arr.forEach((group) => {
        group.reduce((memo, item, index) => {
            memo.push(item);
            if(!!item.partner) {
                const partner = group.find(member => member.id === item.partner);
                if(!memo.includes(partner)) {
                    const partnerIndex = group.indexOf(partner);
                    memo.push(partner);
                    group.splice(partnerIndex, 1);
                    group.splice(index+1,0,partner);
                }               
            }            
            return memo;
        },[])
    });
   
    return arr;
};