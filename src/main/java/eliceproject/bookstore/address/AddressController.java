package eliceproject.bookstore.address;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/myroom/member/address")
@RequiredArgsConstructor
public class AddressController {

    private final AddressService addressService;

    @GetMapping
    public ResponseEntity<List<AddressDTO>> getAllAddress() {
        List<AddressDTO> addressDTOList = addressService.findAll();
        return new ResponseEntity<>(addressDTOList, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<AddressDTO> addAddress(@RequestBody AddressDTO addressDTO) {
        return new ResponseEntity<>(addressService.save(addressDTO), HttpStatus.OK);
    }

    @PatchMapping("/{addressId}")
    public ResponseEntity<AddressDTO> updateAddress(@PathVariable Long addressId, @RequestBody AddressDTO addressDTO) {
        AddressDTO updateAddressDTO = addressService.update(addressId, addressDTO);
        return new ResponseEntity<>(updateAddressDTO, HttpStatus.OK);
    }

    @DeleteMapping("/{addressId}")
    public ResponseEntity<String> deleteAddress(@PathVariable Long addressId) {
        addressService.delete(addressId);
        return new ResponseEntity<>("삭제 되었습니다.", HttpStatus.OK);
    }

}
