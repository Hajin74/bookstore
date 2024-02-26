package eliceproject.bookstore.address;

import eliceproject.bookstore.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;

    private String addressName;

    private String phoneNumber;

    private String mainAddress;

    private String subAddress;

    private Integer zipCode;

    private boolean isDeleted;

    private boolean isDefault;

}
