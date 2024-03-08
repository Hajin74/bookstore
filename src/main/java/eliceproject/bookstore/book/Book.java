package eliceproject.bookstore.book;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String subTitle;
    private int price;
    private int stock;
    private int page;
    private String size;
    private int publishDate;
    private String thumbnailUrl;
    private String publisher;
    private String contents;
    private LocalDateTime created;
    private LocalDateTime updated;
    private int subCategoryId;

    public static Book toEntity(BookDTO BookDTO) {
        return Book.builder()
                .id(BookDTO.getId())
                .title(BookDTO.getTitle())
                .subTitle(BookDTO.getSubTitle())
                .price(BookDTO.getPrice())
                .stock(BookDTO.getStock())
                .page(BookDTO.getPage())
                .size(BookDTO.getSize())
                .publishDate(BookDTO.getPublishDate())
                .thumbnailUrl(BookDTO.getThumbnailUrl())
                .publisher(BookDTO.getPublisher())
                .contents(BookDTO.getContents())
                .created(BookDTO.getCreated())
                .updated(BookDTO.getUpdated())
                .subCategoryId(BookDTO.getSubCategoryId())
                .build();
    }

    /* 재고 개수 변경 메소드*/
    public void setStock(int stock) {
        this.stock -= stock;
    }
}
