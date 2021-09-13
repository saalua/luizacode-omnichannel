class LojaService {
    constructor (LojaModel) {
        this.model = LojaModel
    }
  
    async get () {
      return await this.model.findAll();
    }

    async getById(id) {
      const result = await this.model.findOne({
        where: {
          id
        }
      });
      return result;
    }

}
 
module.exports = LojaService