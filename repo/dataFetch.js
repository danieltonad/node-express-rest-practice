let fs = require("fs")
const FILE_NAME = './store/users.json';

let fecthData = {
    get(resolve, reject) {
        fs.readFile(FILE_NAME, (err, data) => {
            if(err) {
                reject(err);
            }
            else {
                resolve(JSON.parse(data))
            }
        })
    },

    getById(id, resolve, reject) {
        fs.readFile(FILE_NAME, (err, data) => {
            if(err) {
                reject(err);
            }
            else {
                let pie = JSON.parse(data).find(p => p.id == id);
                resolve(pie)
            }
        })
    },

    search(searchQuery, resolve, reject) {
        fs.readFile(FILE_NAME, (err, data) => {
            if(err) {
                reject(err);
            }
            else {
                let pie = JSON.parse(data);
                    if(searchQuery){
                        pie = pie.filter(
                            p => (searchQuery.id ? p.id == searchQuery.id : true) &&
                                 (searchQuery.name ? p.title.toLowerCase().indexOf(searchQuery.title.toLowerCase()) >= 0 : true )
                        
                            );
                    }

                resolve(pie)
            }
        })
    },

    // insert
    insert(newData, resolve, reject) {
        fs.readFile(FILE_NAME, (err, data) => {
            if(err){
                reject(err)
            }
            else {
              
                let pies = JSON.parse(data);
                pies.push(newData);
                console.log(newData)
                fs.writeFile(FILE_NAME, JSON.stringify(pies), (err) => {
                    if(err) {
                        reject(err)
                    }
                    else {
                        resolve(newData);
                    }
                });
            }
        });
    },

    // update data
    update(newData, id, resolve, reject) {
        fs.readFile(FILE_NAME, (err, data) => {
            if(err){
                reject(err)
            }
            else {
              
                let pies = JSON.parse(data);
                let pie = pies.find(p => p.id == id)
                if(pie) {
                    Object.assign(pie, newData);
                }

                console.log(pie)
                
                fs.writeFile(FILE_NAME, JSON.stringify(pies), (err) => {
                    if(err) {
                        reject(err)
                    }
                    else {
                        resolve(newData);
                    }
                });
            }
        });
    },
    
    // delete
    delete(id, resolve, reject) {
        fs.readFile(FILE_NAME, (err, data) => {
            if(err) {
                reject(err);
            } 
            else {
                let pies = JSON.parse(data);
                let index = pies.findIndex(p => p.id == id)
                if(index != -1){
                    pies.splice(index, 1);
                    fs.writeFile(FILE_NAME, JSON.stringify(pies), (err) => {
                        if(err) {
                        reject(err)
                        }
                        else {
                            resolve(pies[index]);
                        }
                    })
                }
            }
        })
    },

}


module.exports = fecthData;e