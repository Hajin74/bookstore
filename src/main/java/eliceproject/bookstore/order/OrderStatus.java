package eliceproject.bookstore.order;

import org.aspectj.weaver.ast.Or;

public enum OrderStatus {
    READY_FOR_SHIPPING("배송 준비중"),
    SHIPPING_IN_PROGRESS("배송중"),
    SHIPPING_COMPLETED("배송 완료");

    private final String koreanOrderStatus;
    OrderStatus(String koreanOrderStatus) {
        this.koreanOrderStatus = koreanOrderStatus;
    }

    public String getKorean() {
        return koreanOrderStatus;
    }
}
