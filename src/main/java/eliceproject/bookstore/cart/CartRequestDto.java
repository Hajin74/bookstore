package eliceproject.bookstore.cart;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CartRequestDto {

    @NotNull(message = "상품을 선택해 주세요.")
    private Long book_id;

    @NotNull(message = "구매 수량을 입력하세요.")
    private Integer quantity;
}