const { AirplaneRepository } = require('../repositories');
const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/errors/app-error');
const airplaneRepository = new AirplaneRepository();

async function createAirplane(data) {
    try {
        const airplane = await airplaneRepository.create(data);
        return airplane;
    } catch(error) {
        if(error.name == 'SequelizeValidationError') {
            let explanation = [];
            error.errors.forEach(err => {
                explanation.push(err.message);
            });
            throw new AppError("Cannot create a new Airplane object", StatusCodes.BAD_REQUEST);
        }
        throw new AppError("Cannot create a new Airplane object", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirplanes() {
    try {
        const airplanes = await airplaneRepository.getAll();
        return airplanes;
    } catch(error) {
        throw new AppError("Cannot fetch Airplanes", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


module.exports = {
    createAirplane,
    getAirplanes
}