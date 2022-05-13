package com.stackroute.service;

import java.util.logging.Level;
import java.util.logging.Logger;

public class MyLogger {

    static final Logger log=Logger.getLogger(Logger.GLOBAL_LOGGER_NAME);

    public void log(String msg)
    {
        log.log(Level.INFO,msg);
    }
}
