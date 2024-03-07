package eliceproject.bookstore.book;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BookDTO {
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
    private int writerId;

    public static BookDTO toDTO(Book book) {
        return BookDTO.builder()
                .id(book.getId())
                .title(book.getTitle())
                .subTitle(book.getSubTitle())
                .price(book.getPrice())
                .stock(book.getStock())
                .page(book.getPage())
                .size(book.getSize())
                .publishDate(book.getPublishDate())
                .thumbnailUrl(book.getThumbnailUrl())
                .publisher(book.getPublisher())
                .contents(book.getContents())
                .created(book.getCreated())
                .updated(book.getUpdated())
                .subCategoryId(book.getSubCategoryId())
                .writerId(book.getWriterId())
                .build();
    }
}
