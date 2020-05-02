module.exports = {
  name: 'todos-feature-ngrx-testing',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/todos/feature/ngrx-testing',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
