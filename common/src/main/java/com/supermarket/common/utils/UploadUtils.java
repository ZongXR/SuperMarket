package com.supermarket.common.utils;



public class UploadUtils {

	/**
	 * 生成文件路径(不包含文件名)
	 * @param fileName 文件名
	 * @param prefix 拼接在路径前的前缀
	 * @return 拼接后的路径
	 */
	public static String getUploadPath(String fileName,String prefix){
		StringBuilder hash = new StringBuilder(Integer.toHexString(fileName.hashCode()));
		while(hash.length()<8){
			hash.append("0");
		}
		StringBuilder uploadBuilder = new StringBuilder(prefix);
		for (int i = 0; i < hash.length(); i++) {
			uploadBuilder.append("/").append(hash.charAt(i));
		}
		prefix = uploadBuilder.toString();
		return prefix;
	}
}
