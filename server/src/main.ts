/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-07-09 15:26:41
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-07-10 14:41:21
 * @Description: 全局入口文件
 */
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AllExceptionsFilter } from '@/filter/all-exception.filter'; // 全局异常过滤器
import { HttpExceptionsFilter } from '@/filter/http-exception.filter'; // http 异常过滤器

import { AppModule } from './app.module';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 错误异常捕获 和 过滤处理
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalFilters(new HttpExceptionsFilter());

  // 构建swagger文档
  const options = new DocumentBuilder()
    .setTitle('vue3-admin')
    .setDescription(
      'Background system based on Nest.js + Vue3 full stack development',
    )
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();