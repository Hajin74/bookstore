package eliceproject.bookstore.cart;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class CartItemResponseDto {

    private Long cartItemId;
    private String title;
    private Integer InsertQuantity;
    private Integer price;

    public static CartItemResponseDto toDto(CartItem cartItem, String title, int price) {
        return new CartItemResponseDto(cartItem.getId(), title, cartItem.getQuantity(), price);
    }
}