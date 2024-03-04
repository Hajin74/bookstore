package eliceproject.bookstore.exhandler;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice(basePackages = "eliceproject.bookstore.order")
public class OrderExceptionHandler {

    @ExceptionHandler
    public ResponseEntity<?> exceptionHandler(Exception e) {
        log.error("[OrderExceptionHandler] exceptionHandler : ", e);
        return new ResponseEntity<>(new ErrorResult("Exception", "서버 내부 오류"), HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
