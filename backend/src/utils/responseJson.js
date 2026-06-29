function responseJson(res,statusCode,isSuccess,customMessage,jwtToken){

    const response = {
        success:isSuccess,
    message:customMessage
    }
    if(jwtToken){
        response.token = `Bearer ${jwtToken}`
    }
return res.status(statusCode).json(response);
}
module.exports={responseJson};
