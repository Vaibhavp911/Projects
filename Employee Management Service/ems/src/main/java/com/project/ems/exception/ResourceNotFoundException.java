package com.project.ems.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends RuntimeException{

    // This File will run when get{id} is called and that {id} is not present in table.
    public ResourceNotFoundException(String message){
        super(message);
    }

}
