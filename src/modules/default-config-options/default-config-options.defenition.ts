import { ConfigurableModuleBuilder } from '@nestjs/common';
import { IConfigOptions } from 'src/interfaces/providers';

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<IConfigOptions>().setClassMethodName('forRoot').build();