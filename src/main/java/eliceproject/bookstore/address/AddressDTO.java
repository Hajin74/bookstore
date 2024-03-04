package eliceproject.bookstore.address;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AddressDTO {

    private Long userId;

    private String addressName;

    private String phoneNumber;

    private String mainAddress;

    private String subAddress;

    private Integer zipCode;

    private boolean isDeleted;

    private boolean isDefault;


    public static AddressDTO toDTO(Address address) {
        return AddressDTO.builder()
                .userId(address.getUser().getId())
                .addressName(address.getAddressName())
                .phoneNumber(address.getPhoneNumber())
                .mainAddress(address.getMainAddress())
                .subAddress(address.getSubAddress())
                .zipCode(address.getZipCode())
                .isDeleted(address.isDeleted())
                .isDefault(address.isDefault())
                .build();
    }

}
