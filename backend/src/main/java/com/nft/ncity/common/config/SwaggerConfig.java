package com.nft.ncity.common.config;

import com.fasterxml.classmate.TypeResolver;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.data.domain.Pageable;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.schema.AlternateTypeRule;
import springfox.documentation.schema.AlternateTypeRules;
import springfox.documentation.service.ApiKey;
import springfox.documentation.service.AuthorizationScope;
import springfox.documentation.service.SecurityReference;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spi.service.contexts.SecurityContext;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger.web.UiConfiguration;
import springfox.documentation.swagger.web.UiConfigurationBuilder;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.util.List;

import static com.google.common.collect.Lists.newArrayList;

/**
 * API 문서 관련 swagger2 설정 정의.
 */
@Configuration
@EnableSwagger2
public class SwaggerConfig {
    TypeResolver typeResolver = new TypeResolver();

    @Bean
    public Docket api() {
        return new Docket(DocumentationType.OAS_30)
                .useDefaultResponseMessages(false)
                .alternateTypeRules(AlternateTypeRules.newRule(typeResolver.resolve(Pageable.class),typeResolver.resolve(Page.class)))
                .select()
                .apis(RequestHandlerSelectors.any())
                .paths(PathSelectors.ant("/**"))
                .build()
                .securityContexts(newArrayList(securityContext()))
                .securitySchemes(newArrayList(apiKey()))
                ;
    }

    private ApiKey apiKey() {
        return new ApiKey(SECURITY_SCHEMA_NAME, "Authorization", "header");
    }

    private SecurityContext securityContext() {
        return SecurityContext.builder()
                .securityReferences(defaultAuth())
                .build();
    }

    public static final String SECURITY_SCHEMA_NAME = "JWT";
    public static final String AUTHORIZATION_SCOPE_GLOBAL = "global";
    public static final String AUTHORIZATION_SCOPE_GLOBAL_DESC = "accessEverything";

    private List<SecurityReference> defaultAuth() {
        AuthorizationScope authorizationScope = new AuthorizationScope(AUTHORIZATION_SCOPE_GLOBAL, AUTHORIZATION_SCOPE_GLOBAL_DESC);
        AuthorizationScope[] authorizationScopes = new AuthorizationScope[1];
        authorizationScopes[0] = authorizationScope;
        return newArrayList(new SecurityReference(SECURITY_SCHEMA_NAME, authorizationScopes));
    }

    @Bean
    UiConfiguration uiConfig() {
        return UiConfigurationBuilder.builder()
//                .supportedSubmitMethods(newArrayList("get").toArray(new String[0])) // try it 기능 활성화 범위
//                .operationsSorter(METHOD)
                .build();
    }

    @Getter
    @Setter
    @ApiModel
    static class Page {
        @ApiModelProperty(value = "페이지 번호(0..N)")
        private Integer page;

        @ApiModelProperty(value = "페이지 크기", allowableValues = "range[0, 100]")
        private Integer size;

        @ApiModelProperty(value = "정렬(사용법: 컬럼명,ASC|DESC)")
        private List<String> sort;
    }


}