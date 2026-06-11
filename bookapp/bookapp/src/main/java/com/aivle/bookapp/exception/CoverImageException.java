package com.aivle.bookapp.exception;

public class CoverImageException extends RuntimeException {

    public CoverImageException(String message) {
        super(message);
    }

    public CoverImageException(String message, Throwable cause) {
        super(message, cause);
    }
}