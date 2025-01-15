package team16.spring_project1.global.exceptions;

import team16.spring_project1.domain.product.product.DTO.RestResponseMessage;

public class DataNotFoundException extends RuntimeException {
    private final String msg;

    public DataNotFoundException(String msg) {
        super(msg);

        this.msg = msg;
    }

    public RestResponseMessage getRestResponseMessage() {
        return new RestResponseMessage(msg);
    }
}
