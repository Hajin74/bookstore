package eliceproject.bookstore.address;

import eliceproject.bookstore.exception.ResourceNotFoundException;
import eliceproject.bookstore.user.User;
import eliceproject.bookstore.user.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@Slf4j
@RestController
@RequestMapping("/api/address")
@RequiredArgsConstructor
public class AddressController {

    private final AddressRepository addressRepository;
    private final AddressService addressService;
    private final UserService userService;

    /* 주소지 등록 */
    @PostMapping
    public ResponseEntity<Address> addAddress(@RequestBody Address address) throws Exception {
        log.info("주소지 등록");

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User)authentication.getPrincipal();
        Long userId = user.getId();

        Address createdAddress = addressService.create(address, userId);
        if (createdAddress == null) {
            throw new Exception("주소지 등록에 실패했습니다.");
        }

        return new ResponseEntity<>(createdAddress, HttpStatus.OK);
    }

    /* 주소지 전체 조회 */
    @GetMapping("/all")
    public ResponseEntity<List<Address>> getAllAddress() {
        List<Address> addressList = addressService.findAll();
        return new ResponseEntity<>(addressList, HttpStatus.OK);
    }

    /* 사용자별 주소지 전체 조회 */
    @GetMapping
    public ResponseEntity<List<Address>> getAllAddressByUser() {
        log.info("사용자별 주소지 전체 조회");

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User)authentication.getPrincipal();

        List<Address> addressList = addressService.findByUserId(user.getId());
        return new ResponseEntity<>(addressList, HttpStatus.OK);
    }

    /* 기본 배송지 조회 */
    @GetMapping("/default")
    public ResponseEntity<Address> getDefaultAddress() {
        log.info("기본 배송지 조회");

        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Long userId = userService.findUserIdByUsername(username);
        Address defaultAddress = addressService.findByUserIdAndIsDefaultTrue(userId);

        return new ResponseEntity<>(defaultAddress, HttpStatus.OK);
    }

    /* 기본 주소지 설정 */
    @PutMapping("/{addressId}/default")
    public ResponseEntity<Address> setDefaultAddress(@PathVariable Long addressId) throws Exception {
        log.info("기본 주소지 설정");

        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Long userId = userService.findUserIdByUsername(username);
        addressService.setDefault(userId, addressId);

        Address defaultAddress = addressService.findById(addressId);
        if (defaultAddress == null) {
            throw new Exception("기본 주소지 설정에 실패했습니다.");
        }
        return new ResponseEntity<>(defaultAddress, HttpStatus.OK);
    }

    /* 주소시 수정 */
    @PatchMapping("/{addressId}")
    public ResponseEntity<Address> updateAddress(@PathVariable Long addressId, @RequestBody AddressDTO addressDTO) throws Exception {
        log.info("주소시 수정");

        Address updateAddress = addressService.update(addressId, addressDTO);
        if (updateAddress == null) {
            throw new Exception("주소지 수정에 실패했습니다.");
        }
        return new ResponseEntity<>(updateAddress, HttpStatus.OK);
    }

    /* 주소시 삭제 */
    @DeleteMapping("/{addressId}")
    public ResponseEntity<Object> deleteAddress(@PathVariable Long addressId) throws ResourceNotFoundException {
        log.info("주소시 삭제");

        addressRepository.findById(addressId)
                        .orElseThrow(() -> new ResourceNotFoundException("Address not found with id : " + addressId));
        addressService.delete(addressId);
        return new ResponseEntity<>("주소지 삭제에 성공했습니다.", HttpStatus.OK);
    }

}
