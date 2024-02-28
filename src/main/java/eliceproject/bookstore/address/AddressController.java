package eliceproject.bookstore.address;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/myroom/member/address")
@RequiredArgsConstructor
public class AddressController {

    private final AddressService addressService;

    /* 주소지 전체조회 */
    @GetMapping
    public ResponseEntity<List<AddressDTO>> getAllAddress() {
        List<AddressDTO> addressDTOList = addressService.findAll();
        return new ResponseEntity<>(addressDTOList, HttpStatus.OK);
    }

    /* 주소지 등록 */
    @PostMapping
    public ResponseEntity<AddressDTO> addAddress(@RequestBody AddressDTO addressDTO) {
        return new ResponseEntity<>(addressService.save(addressDTO), HttpStatus.OK);
    }

    /* 주소지 수정 */
    @PatchMapping("/{addressId}")
    public ResponseEntity<AddressDTO> updateAddress(@PathVariable Long addressId, @RequestBody AddressDTO addressDTO) {
        AddressDTO updateAddressDTO = addressService.update(addressId, addressDTO);
        return new ResponseEntity<>(updateAddressDTO, HttpStatus.OK);
    }

    /* 기본 주소지 설정 및 나머지는 기본 주소지 해제 */
    @PutMapping("/{addressId}/default")
    public ResponseEntity<String> setDefaultAddress(@PathVariable Long addressId) {
        Long userId = 1L; // 임의로 정함, 나중에는 로그인 후 사용자 식별해서 보낼 것
        addressService.setDefault(userId, addressId);
        return new ResponseEntity<>("기본 배송지 설정이 되었습니다.", HttpStatus.OK);
    }

    /* 주소지 삭제 */
    @DeleteMapping("/{addressId}")
    public ResponseEntity<String> deleteAddress(@PathVariable Long addressId) {
        addressService.delete(addressId);
        return new ResponseEntity<>("삭제 되었습니다.", HttpStatus.OK);
    }

}
