package eliceproject.bookstore.exhandler;

import eliceproject.bookstore.exception.ResourceNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice(basePackages = "eliceproject.bookstore.address")
public class AddressExceptionHandler {

    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ErrorResult> illegalExceptionHandler(IllegalArgumentException e) {
        log.error("[AddressExceptionHandler] illegalExceptionHandler", e);
        return new ResponseEntity<>(new ErrorResult("illegalExceptionHandler", e.getMessage()), HttpStatus.NOT_FOUND);
    }

    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResult> resourceNotFoundExceptionHandler(ResourceNotFoundException e) {
        log.error("[AddressExceptionHandler] resourceNotFoundExceptionHandler", e);
        return new ResponseEntity<>(new ErrorResult("resourceNotFoundExceptionHandler", e.getMessage()), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler
    public ResponseEntity<?> exceptionHandler(Exception e) {
        log.error("[AddressExceptionHandler] exceptionHandler : ", e);
        return new ResponseEntity<>(new ErrorResult("Exception", e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
