package com.stackroute.exceptions;

public class PasswordNotMatchedException extends RuntimeException{

    public PasswordNotMatchedException() {
    }

    public PasswordNotMatchedException(String message) {
        super(message);
    }

    @Override
    public String toString() {
        return "PasswordNotMatchedException";
    }
}
