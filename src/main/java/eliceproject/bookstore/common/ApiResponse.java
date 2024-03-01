package eliceproject.bookstore.common;


import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public class ApiResponse<T> {

    private String status;
    private int code;
    private T data;
    private String message;

    public static <T> ApiResponse<T> success (T data, String message) {
        return new ApiResponse<>("OK", 200, data, message);
    }

    public static <T> ApiResponse<T> fail(int code, T data, String message) {
        return new ApiResponse<>("FAIL", code, data, message);
    }

}
