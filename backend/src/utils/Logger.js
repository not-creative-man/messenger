class Logger {
    log(obj, func, inOrOut, ...data){
        console.log(`[${(new Date()).toISOString()}] - ASYNC ${obj}.${func} [${inOrOut ? "IN" : "OUT"}] - ${ JSON.stringify(data) }`);
    }
}

export default new Logger();