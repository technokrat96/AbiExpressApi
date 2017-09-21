var exp = {
    getFullDate:function (format, value) {
        var val_date = Date.now();
        if (typeof value !== "undefined")
            val_date = value;
            
        var obj_date = new Date(val_date);
        
        if(format==null || typeof format === "undefined"){
            return obj_date;
        }
        

        var year = obj_date.getFullYear();
        var month = obj_date.getMonth();
        var day = obj_date.getDate();
        var iDay = obj_date.getDay();
        var hour = obj_date.getHours();
        var minute = obj_date.getMinutes();
        var second = obj_date.getSeconds();
        var array_format = format.split('');

        var array_day = ["Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu", "Minggu"];
        var array_month = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
        
        var preg = {
            "d":function(){
                if(day < 10){
                    return "0"+day;
                }else{
                    return day;
                }
            },
            "D":function(){
                return array_day[iDay].slice(0,3);
            },
            "j":function(){
                return day;
            },
            "l":function(){
                return array_day[iDay];
            },
            "N":function(){
                return iDay+1;
            },
            "F":function(){
                return array_month[month];
            },
            "m":function(){
                var tmp_month = month+1;
                if(tmp_month < 10){
                    return "0"+tmp_month;
                }else{
                    return tmp_month;
                }
            },
            "M":function(){
                return array_month[month].slice(0,3);
            },
            "n":function(){
                var tmp_month = month+1;
                return tmp_month;
            },
            "Y":function(){
                return year;
            },
            "y":function(){
                return year.slice(-2,2);
            },
            "G":function(){
                if(hour < 10){
                    return "0"+hour;
                }else{
                    return hour;
                }
            },
            "H":function(){
                return hour;
            },
            "i":function(){
                if(minute < 10){
                    return "0"+minute;
                }else{
                    return minute;
                }
            },
            "s":function(){
                if(second < 10){
                    return "0"+second;
                }else{
                    return second;
                }
            },
            "f":function(){
                return obj_date.getTime();
            }
        };
        var return_date = [];
        for(var i = 0; i<array_format.length; i++){
            if(typeof preg[array_format[i]] !== "undefined"){
                return_date[i] = preg[array_format[i]]();
            }else{
                return_date[i] = array_format[i];
            }
        }
        return return_date.join('');
    },
    is_defined : function (par){
        if(typeof par !== "undefined"){
            return true;
        }else{
            return false;
        }
    },
    check_params : function(db, req){
        var params = req;
        if (exp.is_defined(params.select)) {
            db.select(params.select);
        }
        if (exp.is_defined(params.where)) {
            for (var i=0; i < params.where.length; i++) {
                if(typeof params.where[i] == "string"){
                    db.whereRaw(params.where[i]);
                }else{
                    db.where(params.where[i]);
                }
            }
        }
        if (exp.is_defined(params.order_by)) {
            db.orderBy(params.order_by.field, params.order_by.type);
        }
        if (exp.is_defined(params.join)) {
            for (var i=0; i < params.join.length; i++) { 
                type = "inner";
                if (exp.is_defined(params.join[i].type)) {
                    type = params.join[i].type;
                }
                switch(type){
                    case "inner":
                        var arr_cond = params.join[i].condition.split(" ");
                        db.innerJoin(params.join[i].table, arr_cond[0], arr_cond[1], arr_cond[2]);
                        break;
                    case "left":
                        db.leftJoin(params.join[i].table, arr_cond[0], arr_cond[1], arr_cond[2]);
                        break;
                    case "left outer":
                        db.leftOuterJoin(params.join[i].table, arr_cond[0], arr_cond[1], arr_cond[2]);
                        break;
                    case "right":
                        db.rightJoin(params.join[i].table, arr_cond[0], arr_cond[1], arr_cond[2]);
                        break;
                    case "right outer":
                        db.rightOuterJoin(params.join[i].table, arr_cond[0], arr_cond[1], arr_cond[2]);
                        break;
                    case "outer":
                        db.outerJoin(params.join[i].table, arr_cond[0], arr_cond[1], arr_cond[2]);
                        break;
                    case "full outer":
                        db.fullOuterJoin(params.join[i].table, arr_cond[0], arr_cond[1], arr_cond[2]);
                        break;
                    case "cross":
                        db.crossJoin(params.join[i].table, arr_cond[0], arr_cond[1], arr_cond[2]);
                        break;
                }
            }
        }
        // if (exp.is_defined(params.like)) {
        //     for (var i=0; i < params.like.length; i++) { 
        //         type = "both";
        //         if (exp.is_defined(params.like[i].type)) {
        //             type = params.like[i].type;
        //         }
        //         db.where(params.like[i].field, "like", params.like[i].match);
        //     }
        // }
        if (exp.is_defined(params.limit)) {
            if (exp.is_defined(params.limit.start) && exp.is_defined(params.limit.end)) {
                db.limit(params.limit.end).offset(params.limit.start);
            }else if (exp.is_defined(params.limit.count)) {
                db.limit(params.limit.count);
            }
        }
        if (exp.is_defined(params.group_by)) {
            if(Array.isArray(params.group_by)){
                for (var i=0; i < params.group_by.length; i++) { 
                    db.groupBy(params.group_by[i]);
                }
            }else{
                db.groupBy(params.group_by);
            }
        }
        return db;
    }
}

module.exports = exp