import { DynamicModule, Global, Module } from '@nestjs/common';
import { DefaultConfigOptionsService } from './default-config-options.service';
import { ConfigurableModuleClass } from './default-config-options.defenition';
import { CONFIG_OPTIONS } from 'src/helpers/constants';

@Global()
@Module({})
export class DefaultConfigOptionsModule extends ConfigurableModuleClass{
  static forRoot(options: Record<string, any>): DynamicModule {
    return {
      module: DefaultConfigOptionsModule,
      providers: [
        DefaultConfigOptionsService,
        {
          provide: CONFIG_OPTIONS,
          useValue: options,
        },
      ],
      exports: [DefaultConfigOptionsService],
    };
  }
}
