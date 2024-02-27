package eliceproject.bookstore.address;

import eliceproject.bookstore.user.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class AddressService {

    private final AddressRepository addressRepository;
    private final UserRepository userRepository;

    @Transactional
    public AddressDTO save(AddressDTO addressDTO) {
        Address address = Address.toEntity(addressDTO, userRepository);
        Address savedAddress = addressRepository.save(address);
        return AddressDTO.toDTO(savedAddress);
    }

    @Transactional(readOnly = true)
    public Address findById(Long addressId) {
        return addressRepository.findById(addressId)
                .orElseThrow(() -> new IllegalArgumentException("Address not found with id : " + addressId));
    }

    @Transactional(readOnly = true)
    public List<Address> findByUser(Long userId) {
        return addressRepository.findByUserId(userId);
    }

    @Transactional(readOnly = true)
    public List<AddressDTO> findAll() {
        List<Address> addressList = addressRepository.findAll();
        return addressList.stream()
                .map(AddressDTO::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public AddressDTO update(Long addressId, AddressDTO addressDTO) {
        Address findAddress = findById(addressId);
        findAddress.changeAddress(addressDTO);
        return AddressDTO.toDTO(findAddress);
    }

    @Transactional
    public void setDefault(Long addressId) {
        Address defaultAddress = findById(addressId);
        defaultAddress.setDefault();
    }

    @Transactional
    public void unsetDefault(Long addressId) {
        Address defaultAddress = findById(addressId);
        defaultAddress.unsetDefault();
    }

    @Transactional
    public void delete(Long addressId) {
        addressRepository.deleteById(addressId);
    }

}
