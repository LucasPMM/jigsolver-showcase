export const deploymentVersion = (baseVersion: string, runNumber?: string) => {
  if (!runNumber || !/^[1-9]\d*$/.test(runNumber)) {
    return `${baseVersion}-dev`
  }

  const [major, minor] = baseVersion.split('.')
  return `${major}.${minor}.${runNumber}`
}
