package com.supermarket.common.dto;

import java.util.List;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@ApiModel(description = "分页查询结果")
public class PageDataDto {

    // 定义jackson对象
    private static final ObjectMapper MAPPER = new ObjectMapper();

    //查询数据总数量
    @ApiModelProperty("查询的条目数")
    private Integer total;

    //分页查询的list结果
    @ApiModelProperty("查询出的列表")
    private List<?> rows;

    public PageDataDto() {
    }

    public PageDataDto(Integer total, List<?> rows) {
        this.total = total;
        this.rows = rows;
    }

    public PageDataDto(Long total, List<?> rows) {
        this.total = total.intValue();
        this.rows = rows;
    }

    /**
     * Object是集合转化
     * @param jsonData json数据
     * @param clazz    要转的类型
     * @return 分页结果
     */
    public static PageDataDto formatToList(String jsonData, Class<?> clazz) {
        try {
            JsonNode jsonNode = MAPPER.readTree(jsonData);
            JsonNode data = jsonNode.get("rows");
            List<?> list = null;
            if (data.isArray() && data.size() > 0) {
                list = MAPPER.readValue(data.traverse(),
                        MAPPER.getTypeFactory().constructCollectionType(List.class, clazz));
            }
            return new PageDataDto(jsonNode.get("total").intValue(), list);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
