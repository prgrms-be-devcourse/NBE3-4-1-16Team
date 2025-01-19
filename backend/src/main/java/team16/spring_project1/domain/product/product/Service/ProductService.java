package team16.spring_project1.domain.product.product.Service;



import static team16.spring_project1.global.configuration.AppConfig.getImagesFolder;
import static team16.spring_project1.global.configuration.AppConfig.getStaticDirectory;

import jakarta.transaction.Transactional;
import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.NoSuchElementException;
import java.util.Objects;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import team16.spring_project1.domain.product.product.Repository.ProductRepository;
import team16.spring_project1.domain.product.product.entity.Product;
import team16.spring_project1.domain.product.product.DTO.ProductRequest;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class ProductService {
    @Autowired
    ProductRepository productRepository;


    public Product create(ProductRequest productRequest) {
        Product product = new Product();
        product.setProductName(productRequest.getProductName());
        product.setCategory(productRequest.getCategory());
        product.setPrice(productRequest.getPrice());
        product.setImageUrl(productRequest.getImageUrl());
        this.productRepository.save(product);
        return product;
    }

    public Product create(String productName,String category, int price, String imageUrl) {
        Product product = new Product();
        product.setProductName(productName);
        product.setCategory(category);
        product.setPrice(price);
        product.setImageUrl(imageUrl);
        this.productRepository.save(product);
        return product;
    }

    @Transactional
    public Product modify(Product product,ProductRequest productRequest){
        product.setProductName(productRequest.getProductName());
        product.setCategory(productRequest.getCategory());
        product.setPrice(productRequest.getPrice());
        product.setImageUrl(productRequest.getImageUrl());
        this.productRepository.save(product);
        return product;
    }

    public boolean delete(Product product){
        if(product == null)
            return false;
        productRepository.delete(product);
        return true;
    }

    public String upload(MultipartFile file){
        if (file.isEmpty()) {
            throw  new NoSuchElementException("이미지 업로드에 실패했습니다.");
        }
        String name =   makeFileName(Objects.requireNonNull(file.getOriginalFilename()));
        String staticUrl = getImagesFolder()+ name;
        String saveUrl = getStaticDirectory() + staticUrl;
        File destFile = new File(saveUrl );
        if (!destFile.getParentFile().exists()) {
            destFile.getParentFile().mkdirs();
        }
      try {
        file.transferTo(destFile);
      } catch (IOException e) {
          throw  new NoSuchElementException("이미지 업로드에 실패했습니다.");
      }
      return staticUrl;
    }

    public String makeFileName(String file) {
        String attcFileNm = UUID.randomUUID().toString().replaceAll("-", "");
        String attcFileOriExt = fileExtCheck(file.substring(file.lastIndexOf(".")));
        return attcFileNm + attcFileOriExt;
    }
    public String fileExtCheck(String originalFileExtension) {
        originalFileExtension = originalFileExtension.toLowerCase();
        if (originalFileExtension.equals(".jpg") || originalFileExtension.equals(".gif")
            || originalFileExtension.equals(".png") || originalFileExtension.equals(".jpeg")
            || originalFileExtension.equals(".bmp")) {
            return originalFileExtension;
        }
        throw  new NoSuchElementException("지원하지않는 형식입니다.");
    }

    public long count() {
        return productRepository.count();
    }

    public Optional<Product> findLatest() {
        return productRepository.findFirstByOrderByIdDesc();
    }

    public List<Product> findAll() {
        return productRepository.findAll();
    }

    public Optional<Product> findById(long id) {
        return productRepository.findById(id);
    }
}
