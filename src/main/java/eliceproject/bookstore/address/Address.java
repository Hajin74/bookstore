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

    public void changeAddress(AddressDTO addressDTO) {
        String newAddressName = addressDTO.getAddressName();
        String newMainAddress = addressDTO.getMainAddress();
        String newSubAddress = addressDTO.getSubAddress();
        boolean newIsDefault = addressDTO.isDefault();

        if (newAddressName != null && !newAddressName.isBlank()) {
            this.addressName = newAddressName;
        }
        if (newMainAddress != null && !newMainAddress.isBlank()) {
            this.mainAddress = newMainAddress;
        }
        if (newSubAddress != null && !newSubAddress.isBlank()) {
            this.subAddress = newSubAddress;
        }
        if (newIsDefault) {
            setDefault();
        }
    }

    public void setDefault() {
        this.isDefault = true;
    }

    public void unsetDefault() {
        this.isDefault = false;
    }

    @Override
    public String toString() {
        return "Address{" +
                "id=" + id +
                ", user=" + user +
                ", addressName='" + addressName + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", mainAddress='" + mainAddress + '\'' +
                ", subAddress='" + subAddress + '\'' +
                ", zipCode=" + zipCode +
                ", isDeleted=" + isDeleted +
                ", isDefault=" + isDefault +
                '}';
    }

}
