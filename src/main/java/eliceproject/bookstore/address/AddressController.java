package eliceproject.bookstore.address;

import eliceproject.bookstore.common.ApiResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@Slf4j
@RestController
@RequestMapping("/myroom/member/address")
@RequiredArgsConstructor
public class AddressController {

    private final AddressService addressService;

    /* 주소지 등록 */
    @PostMapping
    public ApiResponse<Address> addAddress(@RequestBody Address address) {
        try {
            return ApiResponse.success(addressService.create(address), "주소지 등록에 성공했습니다.");
        } catch (Exception e) {
            log.error("주소지 등록에 실패했습니다.", e);
            return ApiResponse.fail(500, null, "주소지 등록에 실패했습니다.");
        }
    }

    /* 주소지 전체 조회 */
    @GetMapping
    public ApiResponse<List<Address>> getAllAddress() {
        try {
            List<Address> addressList = addressService.findAll();
            return ApiResponse.success(addressList, "주소지 전체 조회에 성공했습니다.");
        } catch (Exception e) {
            log.error("주소지 전체 조회에 실패했습니다.", e);
            return ApiResponse.fail(500, null, "주소지 전체 조회에 실패했습니다.");
        }
    }

    /* 기본 주소지 설정 및 나머지는 기본 주소지 해제 */
    @PutMapping("/{addressId}/default")
    public ApiResponse<Address> setDefaultAddress(@PathVariable Long addressId) {
        try {
            Long userId = 1L;
            addressService.setDefault(userId, addressId);
            Address defaultAddress = addressService.findById(addressId);
            return ApiResponse.success(defaultAddress, "기본 주소시 설정에 성공했습니다.");
        } catch (Exception e) {
            log.error("기본 주소지 설정에 실패했습니다.", e);
            return ApiResponse.fail(500, null, "기본 주소지 설정에 실패했습니다.");
        }
    }

    /* 주소시 수정 */
    @PatchMapping("/{addressId}")
    public ApiResponse<Address> updateAddress(@PathVariable Long addressId, @RequestBody Address address) {
        try {
            Address updateAddress = addressService.update(addressId, address);
            return ApiResponse.success(updateAddress, "주소지 수정에 성공했습니다.");
        } catch (Exception e) {
            log.error("주소시 수정에 실패했습니다.", e);
            return ApiResponse.fail(500, null, "주소시 수정에 실패했습니다.");
        }
    }

    /* 주소시 삭제 */
    @DeleteMapping("/{addressId}")
    public ApiResponse<Object> deleteAddress(@PathVariable Long addressId) {
        try {
            addressService.delete(addressId);
            return ApiResponse.success(null, "주소지 삭제에 성공했습니다.");
        } catch (Exception e) {
            log.error("주소시 삭제에 실패했습니다.", e);
            return ApiResponse.fail(500, null, "주소시 삭제에 실패했습니다.");
        }
    }

}
