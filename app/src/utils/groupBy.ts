import {MemberType} from '../types';

export const groupBy =(arr: MemberType[], property: string) => {
    const grouppedArray = arr?.reduce(function(memo, x) {
      // @ts-ignore  
      if (!memo[x[property]]) { memo[x[property]] = []; }
      // @ts-ignore
      memo[x[property]].push(x);
      return memo;
    }, {});
    return grouppedArray;
};

export const sortLevel = (arr:Array<MemberType[]>) => {
    arr.forEach((group: MemberType[]) => {
        group.reduce((memo:MemberType[], item, index) => {
            memo.push(item);
            if(!!item.partner) {
                const partner = group.find(member => member._id === item.partner);
                if(!!partner && !memo.includes(partner)) {
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