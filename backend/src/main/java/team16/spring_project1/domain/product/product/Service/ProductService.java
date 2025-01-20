package team16.spring_project1.domain.product.product.Service;




import static team16.spring_project1.global.configuration.AppConfig.getImagesFolder;
import static team16.spring_project1.global.configuration.AppConfig.getStaticDirectory;

import jakarta.transaction.Transactional;
import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;
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

    public Map<Boolean,String> upload(MultipartFile file){
        Map<Boolean, String> response = new HashMap<Boolean, String> ();
        if (file.isEmpty()) {
            response.put(false, "이미지 업로드에 실패했습니다.");
            return response;
        }
        String name = makeFileName(Objects.requireNonNull(file.getOriginalFilename()));
        if(name.isEmpty()){
            response.put(false, "지원되지 않는 형식입니다.");
            return response;
        }
        String staticUrl = getImagesFolder()+ name;
        String saveUrl = getStaticDirectory() + staticUrl;
        File destFile = new File(saveUrl );
        if (!destFile.getParentFile().exists()) {
            destFile.getParentFile().mkdirs();
        }
      try {
        file.transferTo(destFile);
          response.put(true, staticUrl);
      } catch (IOException e) {
          throw  new NoSuchElementException("이미지 업로드에 실패했습니다.");
      }

      return response;
    }

    public String makeFileName(String file) {
        String attcFileNm = UUID.randomUUID().toString().replaceAll("-", "");
        String attcFileOriExt = fileExtCheck(file.substring(file.lastIndexOf(".")));
        if(attcFileOriExt.isEmpty()) return "";
        return attcFileNm + attcFileOriExt;
    }
    public String fileExtCheck(String originalFileExtension) {
        originalFileExtension = originalFileExtension.toLowerCase();
        if (originalFileExtension.equals(".jpg") || originalFileExtension.equals(".gif")
            || originalFileExtension.equals(".png") || originalFileExtension.equals(".jpeg")
            || originalFileExtension.equals(".bmp")) {
            return originalFileExtension;
        }
        return "";
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
