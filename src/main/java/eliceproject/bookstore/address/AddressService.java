package eliceproject.bookstore.address;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

public interface AddressService {

    Address create(Address address);

    List<Address> findAll();

    List<Address> findByUserId(Long userId);

    Address findById(Long addressId);

    Address update(Long addressId, AddressDTO addressDTO);

    void setDefault(Long userId, Long addressId);

    void delete(Long addressId);

}
