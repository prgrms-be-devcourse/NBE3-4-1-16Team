package team16.spring_project1.global.globalExceptionHandler;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import team16.spring_project1.domain.product.product.DTO.RestResponseMessage;
import team16.spring_project1.global.exceptions.DataNotFoundException;

@ControllerAdvice
@RequiredArgsConstructor
public class GlobalExceptionHandler {
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(DataNotFoundException.class)
    public RestResponseMessage handle(DataNotFoundException ex) {
        ex.printStackTrace();

        return ex.getRestResponseMessage();
    }
}
