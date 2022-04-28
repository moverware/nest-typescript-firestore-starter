import { DynamicModule } from '@nestjs/common'
import { Firestore, Settings } from '@google-cloud/firestore'
import {
  FirestoreDatabaseProvider,
  FirestoreOptionsProvider,
  FirestoreCollectionProviders,
} from './firestore.providers'

interface FirestoreModuleOptions {
  // To import any module (and therefore its exported providers) that optionProviderUseFactory may need to generate settings
  imports?: any[]
  optionProviderUseFactory: (...args: any[]) => Settings
  // To inject any provider that optionProviderUseFactory may need to generate settings
  inject?: any[]
}

// default options
const defaultOptions: FirestoreModuleOptions = {
  optionProviderUseFactory: () => ({
    projectId: 'myGcpProjectId',
  }),
}

export class FirestoreModule {
  // register makes this module dynamic, meaning it can instantiate differently depending on the options passed in
  static register(
    options: FirestoreModuleOptions = defaultOptions,
  ): DynamicModule {
    // Set up option provider used by the dbProvider below
    // This is a custom provider that is a single value (the result of useFactory). Needs to be used with the @Injectable() decorator in other providers
    const optionsProvider = {
      // name of provider
      provide: FirestoreOptionsProvider,
      // The result of useFactory will be the value of the provider. Uses inject below to populate arguments
      useFactory: options.optionProviderUseFactory,
      // injecting other providers into useFactory. The order of inject needs to match the argument order of useFactory.
      inject: options.inject,
    }

    // Set up the dbProvider used by the collection providers as well as is exported
    const dbProvider = {
      provide: FirestoreDatabaseProvider,
      useFactory: config => new Firestore(config),
      inject: [FirestoreOptionsProvider],
    }

    // Set up a collection provider per collection in the FirestoreCollectionProviders. Each one is exported
    const collectionProviders = FirestoreCollectionProviders.map(
      providerName => ({
        provide: providerName,
        useFactory: db => db.collection(providerName),
        inject: [FirestoreDatabaseProvider],
      }),
    )

    // Returns same parameters as a static module, adding `module` so we know the name
    return {
      global: true,
      module: FirestoreModule,
      imports: options.imports,
      providers: [optionsProvider, dbProvider, ...collectionProviders],
      exports: [dbProvider, ...collectionProviders],
    }
  }
}
