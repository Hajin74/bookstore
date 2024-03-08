package eliceproject.bookstore.address;

import eliceproject.bookstore.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@Slf4j
@RestController
@RequestMapping("/api/address")
@RequiredArgsConstructor
public class AddressController {

    private final AddressRepository addressRepository;
    private final AddressService addressService;

    /* 주소지 등록 */
    @PostMapping
    public ResponseEntity<Address> addAddress(@RequestBody Address address) throws Exception {
        Address createdAddress = addressService.create(address);
        if (createdAddress == null) {
            throw new Exception("주소지 등록에 실패했습니다.");
        }
        return new ResponseEntity<>(createdAddress, HttpStatus.OK);
    }

    /* 주소지 전체 조회 */
    @GetMapping
    public ResponseEntity<List<Address>> getAllAddress() {
        List<Address> addressList = addressService.findAll();
        return new ResponseEntity<>(addressList, HttpStatus.OK);
    }


    /* 기본 주소지 설정 */
    @PutMapping("/{addressId}/default")
    public ResponseEntity<Address> setDefaultAddress(@PathVariable Long addressId) throws Exception {
        Long userId = 1L;
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
        Address updateAddress = addressService.update(addressId, addressDTO);
        if (updateAddress == null) {
            throw new Exception("주소지 수정에 실패했습니다.");
        }
        return new ResponseEntity<>(updateAddress, HttpStatus.OK);
    }

    /* 주소시 삭제 */
    @DeleteMapping("/{addressId}")
    public ResponseEntity<Object> deleteAddress(@PathVariable Long addressId) throws ResourceNotFoundException {
        addressRepository.findById(addressId)
                        .orElseThrow(() -> new ResourceNotFoundException("Address not found with id : " + addressId));
        addressService.delete(addressId);
        return new ResponseEntity<>("주소지 삭제에 성공했습니다.", HttpStatus.OK);
    }

}
