package eliceproject.bookstore.address;

import eliceproject.bookstore.user.User;
import eliceproject.bookstore.user.UserRepository;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Builder
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


    public static Address toEntity(AddressDTO addressDTO, UserRepository userRepository) {
        Long userId = addressDTO.getUserId();
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with id: " + userId));

        return Address.builder()
                .user(user)
                .addressName(addressDTO.getAddressName())
                .phoneNumber(addressDTO.getPhoneNumber())
                .mainAddress(addressDTO.getMainAddress())
                .subAddress(addressDTO.getSubAddress())
                .zipCode(addressDTO.getZipCode())
                .isDeleted(addressDTO.isDeleted())
                .isDefault(addressDTO.isDefault())
                .build();
    }

    public void changeAddress(String addressName, String mainAddress, String subAddress, Boolean isDefault) {
        this.addressName = (addressName == null || addressName.isBlank()) ? this.addressName : addressName;
        this.mainAddress = (mainAddress == null || mainAddress.isBlank()) ? this.mainAddress : mainAddress;
        this.subAddress = (subAddress == null || subAddress.isBlank()) ? this.subAddress : subAddress;
        this.isDefault = (isDefault == null) ? this.isDefault : isDefault;
    }

}
